"use client";

import { PageHeader } from "@/components/page-header/PageHeader";
import { JobsSearch } from "@/components/widget/jobs/jobs-search/JobsSearch";
import { PostAdd } from "@mui/icons-material";
import { Button, Container, Pagination, Stack } from "@mui/material";
import { useEffect, useReducer, useState } from "react";

import { QueryResponse } from "@/entities/models/response";
import { PostHeader } from "@/entities/models/post";
import { LoadingSpinner } from "@/components/loading/loadingSpinner";
import { ErrorDisplay } from "@/components/error/error_display";
import { itemPerPage } from "@/utils/const";
import { getPost, postsStateReducer, QueryState, State } from "./action";
import { GeneralPosts } from "./posts";

const initialState: State<QueryResponse<PostHeader[]>> = {
  status: "loading",
  component: <LoadingSpinner />,
};

const baseQueryState: QueryState = {
  page: 1,
  totalPage: 1,
};

export function Content() {
  const [pageState, dispatch] = useReducer(postsStateReducer, initialState);
  const [queryState, setQueryState] = useState<QueryState>(baseQueryState);

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
      const res: QueryResponse<PostHeader[]> = await getPost({
        domain: 2020,
        itemPerPage: 10,
        page: 1,
      });

      // console.log(data);
      dispatch({
        type: "FETCH_SUCCESS",
        payload: res,
        component: <GeneralPosts posts={res.data} />,
      });
      setQueryState((prev) => ({
        ...prev,
        page: res.page,
        totalPage: Math.ceil(res.totalItem / itemPerPage),
      }));
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
