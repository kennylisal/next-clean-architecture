// import { PostsQuery } from "@/application/repositories/posts.repository.interface";
// import { IGetPostForUserUseCase } from "@/application/use-case/get-general-post";
// import { Post, PostHeader } from "@/entities/models/post";
// import { QueryResponse } from "@/entities/models/response";

// function presenter(response: QueryResponse<Post[]>) {
//   const data: PostHeader[] = response.data.map((p) => ({
//     post_id: p.post_id,
//     title: p.title,
//     author: "Manager",
//     created_at: p.created_at,
//   }));
//   return {
//     page: response.page,
//     totalItem: response.totalCount,
//     data: data,
//   };
// }

// export type IGetPostForUserUserController = ReturnType<
//   typeof getPostForUserController
// >;

// export const getPostForUserController =
//   (getPostForUserUseCase: IGetPostForUserUseCase) =>
//   async (
//     sessionId: string,
//     query: PostsQuery
//   ): Promise<ReturnType<typeof presenter>> => {
//     //nanti tambahakn authentication disini
//     const posts = await getPostForUserUseCase(query);
//     return presenter(posts);
//   };
