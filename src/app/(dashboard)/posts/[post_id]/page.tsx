"use client";

import { PageHeader } from "@/components/page-header/PageHeader";
import { FavoriteBorder, OpenInNew } from "@mui/icons-material";

import { Button, Container, Stack } from "@mui/material";
import { useEffect, useReducer } from "react";
import { LoadingSpinner } from "@/components/loading/loadingSpinner";

import { ErrorDisplay } from "@/components/error/error_display";
import { Post } from "@/entities/models/post";
import { useParams } from "next/navigation";
import { PostDetail } from "../../detail/detail";
import { postsStateReducer, State } from "../../posts/action";

const initialState: State<Post> = {
  status: "loading",
  component: <LoadingSpinner />,
};
export default function JobDetals() {
  const [pageState, dispatch] = useReducer(postsStateReducer, initialState);
  const params = useParams(); // Get dynamic route parameters
  const post_id = params.post_id as string;

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/posts/${post_id}`);
      if (!res.ok) {
        dispatch({
          type: "FETCH_ERROR",
          payload: "Failed fetching data",
          component: <ErrorDisplay text="Failed fetching data" />,
        });
      } else {
        const data = (await res.json()) as Post;
        // console.log(data);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: data,
          component: <PostDetail />,
        });
      }
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
    if (pageState.status !== "forbidden") fetchData();
  }, []);
  return (
    <Container>
      <PageHeader
        title="Halaman Detail"
        breadcrumbs={["Jobs", "Details"]}
        renderRight={
          <Stack direction={"row"} spacing={1}>
            <Button
              variant={"outlined"}
              color={"secondary"}
              //   onClick={() => navigate(routes.jobsEdit)}
            >
              Edit
            </Button>
            <Button color={"error"} variant={"outlined"}>
              Remove
            </Button>
            <Button variant={"outlined"} startIcon={<FavoriteBorder />}>
              Save
            </Button>
            <Button variant={"contained"} startIcon={<OpenInNew />}>
              Apply
            </Button>
          </Stack>
        }
      />
      {pageState.component}
    </Container>
  );
}
