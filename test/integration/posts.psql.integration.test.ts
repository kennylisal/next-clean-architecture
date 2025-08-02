import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import knexDB from "@/infrastructure/config/knex_db";
import { PostSQLRepositories } from "@/infrastructure/repositories/post.repository.sql";

describe("PostSQLRepositories Integration Tests", () => {
  it("should be connected to psqlDB", async () => {
    let isConnected = false;
    try {
      await knexDB.raw("SELECT 1");
      isConnected = true;
      console.log("Database connection successful");
    } catch (error) {
      console.error("Database connection failed:", error);
      throw new Error("Failed to connect to test database");
    }
    expect(isConnected).toBe(true);
  });
});

describe("getPostsForUser", () => {
  it("should retrieve paginated posts with correct result", async () => {
    //arrange
    const repository = new PostSQLRepositories();
    const page1request: PostsQuery = {
      page: 1,
      itemPerPage: 10,
    };

    //act
    const page1Result = await repository.getPostsForUser(page1request);

    //assert
    expect(page1Result.data).toHaveLength(page1request.itemPerPage);
  });
});

// describe("getPostsDetail", () => {});
