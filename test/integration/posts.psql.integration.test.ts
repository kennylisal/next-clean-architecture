import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import knexDB from "@/infrastructure/config/knex_db";
import { PostSQLRepositories } from "@/infrastructure/repositories/post.repository.sql";
import { faker } from "@faker-js/faker";

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

describe("getPost should retrieve based on needs", () => {
  //
  //top-arrange
  beforeAll(async () => {
    const postsData = Array.from({ length: 20 }).map((_) => ({
      body: faker.lorem.paragraphs({ min: 2, max: 4 }),
      title: faker.lorem.words({ min: 4, max: 10 }),
      author: faker.string.alphanumeric(10),
    }));
    const dataForTesting = [
      {
        title: "Post 1",
        author: "Author 1",
        body: "This is the body of post 1",
        created_at: "2023-01-01 10:00:00",
      },
      {
        title: "Post 2",
        author: "Author 2",
        body: "This is the body of post 2",
        created_at: "2023-01-02 12:00:00",
      },
      {
        title: "Post 3",
        author: "Author 3",
        body: "This is the body of post 3",
        created_at: "2023-01-03 15:00:00",
      },
      {
        title: "Post Pencarian",
        author: "Author 4",
        body: "This is the body of post 4",
        created_at: "2025-01-03 15:00:00",
      },
    ];
    await knexDB("posts").insert([...postsData, ...dataForTesting]);
  });
  afterAll(async () => {
    await knexDB("posts").truncate();
  });
  //
  //actual-test
  it("should retrieve paginated posts", async () => {
    //arrange
    const repository = new PostSQLRepositories();
    const page1request: PostsQuery = {
      page: 1,
      itemPerPage: 10,
    };
    const page2request: PostsQuery = {
      page: 2,
      itemPerPage: 10,
    };

    //act
    const page1Result = await repository.getGeneralPost(page1request);
    const page2Result = await repository.getGeneralPost(page2request);

    //assert
    expect(page1Result.data).toHaveLength(10);
    expect(page2Result.data).toHaveLength(10);
    expect(page1Result).not.toEqual(page2Result);
  });

  it("should retrieve posts with dates range", async () => {
    //arrange
    const repository = new PostSQLRepositories();

    //act
    const postRequest: PostsQuery = {
      page: 1,
      itemPerPage: 10,
      dateStart: "2023-01-01T00:00:01.000Z",
      dateEnd: "2023-01-03T23:00:00.000Z",
    };
    const res = await repository.getGeneralPost(postRequest);

    //assert
    expect(res.data).toHaveLength(3);
  });

  it("should retrieve posts with search, case-insensitive", async () => {
    //arrange
    const repository = new PostSQLRepositories();

    //act
    const res = await repository.getGeneralPost({
      itemPerPage: 10,
      page: 1,
      search: "post pen",
    });

    //assert
    expect(res.data[0].title).toBe("Post Pencarian");
  });

  it("should add new data to DB", async () => {
    //arrange
    const repository = new PostSQLRepositories();
    const newData = {
      title: "Post 4",
      author: "Author 4",
      body: "This is the body of post 4",
      created_at: "2023-01-03 15:00:00",
    };
    //act
    const res = await repository.createPost(newData);

    //assert
    expect(res).toBe(true);
  });
});
