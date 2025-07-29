import { IGetPostDetailUseCase } from "@/application/use-case/get-post-detail-usecase";
import { DataNotFoundError } from "@/entities/error/common";

function presenter(post: Post, user: string) {
  return {
    content: post.body,
    user: user,
    title: post.title,
  };
}

// export type IGetPostDetailController = ReturnType<typeof getPost

export const getPostDetailController =
  (getPostDetailUserCase: IGetPostDetailUseCase) =>
  async (postId: number): Promise<ReturnType<typeof presenter>> => {
    const post = await getPostDetailUserCase(postId);
    if (post) return presenter(post, "kenny");
    else {
      throw new DataNotFoundError("Data tidak ditemukan");
    }
  };
