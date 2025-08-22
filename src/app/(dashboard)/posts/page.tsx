"use client";

import { PageHeader } from "@/components/page-header/PageHeader";
import { JobsSearch } from "@/components/widget/jobs/jobs-search/JobsSearch";
import { PostAdd } from "@mui/icons-material";
import { Button, Container, Pagination, Stack } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { GeneralPosts } from "./posts";
import { QueryResponse } from "@/entities/models/response";
import { PostHeader } from "@/entities/models/post";
import { LoadingSpinner } from "@/components/loading/loadingSpinner";
import { ErrorDisplay } from "@/components/error/error_display";
import { itemPerPage } from "@/utils/const";
import { postsStateReducer, QueryState, State } from "./action";

const initialState: State<QueryResponse<PostHeader[]>> = {
  status: "loading",
  component: <LoadingSpinner />,
};

const baseQueryState: QueryState = {
  page: 1,
  totalPage: 1,
};

const getURLHelper = (args: Record<string, string | undefined>) => {
  let result = "";
  for (const key in args) {
    if (args[key] !== undefined) result += `&${key}=${args[key]}`;
  }
  return result;
};

export default function TestPage() {
  const [pageState, dispatch] = useReducer(postsStateReducer, initialState);
  const [queryState, setQueryState] = useState<QueryState>(baseQueryState);

  const generateApiUrl = (page: number) => {
    const initUrl = `/api/posts?page=${page}&itemPerPage=${itemPerPage}`;
    const additionalParameters = getURLHelper({
      searchQuery: queryState.searchQuery,
      dateStart: queryState.dateStart,
      dateEnd: queryState.dateEnd,
    });
    console.log(initUrl + additionalParameters);
    return initUrl + additionalParameters;
  };

  const handleSearch = (
    dateStart: string | undefined,
    dateEnd: string | undefined,
    search: string | undefined
  ) => {
    setQueryState((prev) => ({
      ...prev,
      page: 1,
      searchQuery: search,
      dateEnd: dateEnd,
      dateStart: dateStart,
    }));
    console.log(queryState.searchQuery);
  };

  const fetchPost = async (page: number) => {
    try {
      const res = await fetch(generateApiUrl(page));
      if (!res.ok) {
        dispatch({
          type: "FETCH_ERROR",
          payload: "Failed fetching data",
          component: <ErrorDisplay text="Failed fetching data" />,
        });
      } else {
        const data = (await res.json()) as QueryResponse<PostHeader[]>;
        // console.log(data);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
          component: <GeneralPosts posts={data.data} />,
        });
        setQueryState((prev) => ({
          ...prev,
          page: data.page,
          totalPage: Math.ceil(data.totalItem / itemPerPage),
        }));
      }
      console.log(queryState);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unexpected Error Fetching Data";
      dispatch({
        type: "FETCH_ERROR",
        payload: message,
        component: <ErrorDisplay text={message} />,
      });
    }
  };

  useEffect(() => {
    fetchPost(queryState.page);
  }, [queryState.page, queryState.searchQuery]);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setQueryState((prev) => ({ ...prev, page: value }));
  };

  return (
    <Container maxWidth={"lg"}>
      <PageHeader
        title={"Jobs"}
        breadcrumbs={["Jobs", "List"]}
        renderRight={
          <Button variant={"contained"} startIcon={<PostAdd />}>
            Create
          </Button>
        }
      />
      <JobsSearch handleSearch={handleSearch} />
      {pageState.component}
      <Stack alignItems={"center"}>
        {pageState.status === "success" && (
          <Pagination
            page={queryState.page}
            count={queryState.totalPage}
            variant="outlined"
            shape="rounded"
            onChange={handlePagination}
          />
        )}
      </Stack>
    </Container>
  );
}
