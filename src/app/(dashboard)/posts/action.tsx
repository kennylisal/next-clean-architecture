import { JSX } from "react";

export interface State<T> {
  status: "idle" | "loading" | "success" | "error" | "forbidden";
  data?: T;
  error?: string;
  component: JSX.Element;
}

export type Action<T> =
  | { type: "FETCH_START"; component: JSX.Element }
  | {
      type: "FETCH_SUCCESS";
      payload: T;
      component: JSX.Element;
    }
  | { type: "FETCH_ERROR"; payload: string; component: JSX.Element }
  | { type: "STOP_OPERATION"; payload: string; component: JSX.Element };

export function postsStateReducer<T>(
  state: State<T>,
  action: Action<T>
): State<T> {
  switch (action.type) {
    case "FETCH_START":
      return { status: "loading", component: action.component };
    case "FETCH_ERROR":
      return {
        status: "error",
        error: action.payload,
        component: action.component,
      };
    case "FETCH_SUCCESS":
      return {
        status: "success",
        data: action.payload,
        component: action.component,
      };
    case "STOP_OPERATION":
      return {
        status: "success",
        component: action.component,
      };
    default:
      return state;
  }
}

export interface QueryState {
  page: number;
  totalPage: number;
  searchQuery?: string;
  dateStart?: string;
  dateEnd?: string;
}
