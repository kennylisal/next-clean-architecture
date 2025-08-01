import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import knexDB from "@/infrastructure/config/knex_db";
import { PostSQLRepositories } from "@/infrastructure/repositories/post.repository.sql";

// describe("PostSQLRepositories Integration Tests", () => {
//   beforeAll(async () => {
//     // Test Knex connection
//     try {
//       await knexDB.raw("SELECT 1");
//       console.log("Database connection successful");
//     } catch (error) {
//       console.error("Database connection failed:", error);
//       throw new Error("Failed to connect to test database");
//     }
//   });
// });

describe("getPostsForUser", () => {
  it("should retrieve paginated posts with correct result", async () => {
    const repository = new PostSQLRepositories();
    const page1request: PostsQuery = {
      page: 1,
      itemPerPage: 10,
    };
    const page1Result = await repository.getPostsForUser(page1request);
    expect(page1Result).toHaveLength(page1request.itemPerPage);
  });
});
