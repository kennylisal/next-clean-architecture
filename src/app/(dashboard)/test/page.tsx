"use client";

import { Post } from "@/entities/models/post";
import { QueryResponse } from "@/entities/models/response";
import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts?page=1&itemPerPage=10&domain=2020`);
      if (!res.ok) throw new Error("Fetch error");
      console.log(await res.json());
    };
    fetchPost();
  });
  return <h1>TEST</h1>;
}
