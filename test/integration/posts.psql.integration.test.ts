import { PostsQuery } from "@/application/repositories/posts.repository.interface";
import { CreateDomain, Domain } from "@/entities/models/domain";
import { CreatePost } from "@/entities/models/post";
import knexDB from "@/infrastructure/config/knex_db";
import { PostSQLRepositories } from "@/infrastructure/repositories/post.repository.sql";
import { faker } from "@faker-js/faker";

//all the test inside of it follows these 3 basic structure
//arrange -> preparing / aranging data
//act -> gathering data or executing something to be tested
//assert => testing the result of act

//In this test there are 2 type of domain : general and spesific
//there are 20 general post

//there are 4 spesific post
//  3 of them are created in 2023 while others in 2025
//  1 of them have title "Post Pencarian"

let domainArr: { domain_id: number }[] = [];
describe("PostSQLRepositories Integration Tests", () => {
  beforeAll(async () => {
    await knexDB.raw("TRUNCATE TABLE posts, domains RESTART IDENTITY CASCADE");
  });
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

  it("should be able to insert domains", async () => {
    const domains: CreateDomain[] = [
      {
        description: "deskripsi domain 1",
        domain_name: "general",
        domain_visibility: "public",
        domain_id: 2020,
        domain_status: "active",
        membership_acceptance: "open",
      },
      {
        description: "deskripsi domain 2",
        domain_name: "spesific",
        domain_visibility: "restricted",
        domain_id: 2021,
        domain_status: "active",
        membership_acceptance: "confirmation",
      },
    ];
    const res: { domain_id: number }[] = await knexDB("domains")
      .insert(domains)
      .returning("domain_id");
    domainArr = res;
    expect(domainArr).toStrictEqual([{ domain_id: 2020 }, { domain_id: 2021 }]);
  });

  it("should be able to insert posts", async () => {
    const postsData = Array.from({ length: 20 }).map((_) => ({
      body: faker.lorem.paragraphs({ min: 2, max: 4 }),
      title: faker.lorem.words({ min: 4, max: 10 }),
      author: faker.string.alphanumeric(10),
      domain_id: domainArr[0].domain_id,
    }));
    const dataForTesting = [
      {
        title: "Post 1",
        author: "Author 1",
        body: "This is the body of post 1",
        created_at: "2023-01-01 10:00:00",
        domain_id: domainArr[1].domain_id,
      },
      {
        title: "Post 2",
        author: "Author 2",
        body: "This is the body of post 2",
        created_at: "2023-01-02 12:00:00",
        domain_id: domainArr[1].domain_id,
      },
      {
        title: "Post 3",
        author: "Author 3",
        body: "This is the body of post 3",
        created_at: "2023-01-03 15:00:00",
        domain_id: domainArr[1].domain_id,
      },
      {
        title: "Post Pencarian",
        author: "Author 4",
        body: "This is the body of post 4",
        created_at: "2025-01-03 15:00:00",
        domain_id: domainArr[1].domain_id,
      },
    ];
    const result: { domain_id: number }[] = await knexDB("posts")
      .insert([...postsData, ...dataForTesting])
      .returning("post_id");

    expect(result).toHaveLength(24);
  });
});

describe("getPosts should retrieve based on needs", () => {
  //actual-test
  it("should retrieve paginated posts", async () => {
    //arrange
    const repository = new PostSQLRepositories();
    const page1request: PostsQuery = {
      page: 1,
      itemPerPage: 10,
      domain: domainArr[0].domain_id,
    };
    const page2request: PostsQuery = {
      page: 2,
      itemPerPage: 10,
      domain: domainArr[0].domain_id,
    };

    //act
    const page1Result = await repository.getPosts(page1request);
    const page2Result = await repository.getPosts(page2request);

    //assert
    expect(page1Result.data).toHaveLength(10);
    expect(page2Result.data).toHaveLength(10);
    expect(page1Result).not.toEqual(page2Result);
  });

  it("should retrieve posts based on specified domain", async () => {
    //arrange
    const repository = new PostSQLRepositories();
    const page1request: PostsQuery = {
      page: 1,
      itemPerPage: 10,
      domain: domainArr[1].domain_id,
    };

    //act
    const page1Result = await repository.getPosts(page1request);

    //assert
    expect(page1Result.totalCount).toStrictEqual(4);
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
      domain: domainArr[1].domain_id,
    };
    const res = await repository.getPosts(postRequest);

    //assert
    expect(res.data).toHaveLength(3);
  });

  it("should retrieve posts with search, case-insensitive", async () => {
    //arrange
    const repository = new PostSQLRepositories();

    //act
    const res = await repository.getPosts({
      itemPerPage: 10,
      page: 1,
      search: "post pen",
      domain: domainArr[1].domain_id,
    });

    //assert
    expect(res.data[0].title).toBe("Post Pencarian");
  });
});

let testtedPostId = 0;

describe("createPost should add new post data", () => {
  it("should add new post data to DB", async () => {
    //arrange
    const repository = new PostSQLRepositories();
    const newData = {
      title: "Post 4",
      author: "Author 4",
      body: "This is the body of post 4",
      created_at: "2023-01-03 15:00:00",
      domain_id: domainArr[0].domain_id,
    };
    //act
    const res = await repository.createPost(newData);
    testtedPostId = Number(res);
    //assert
    expect(testtedPostId).toBeGreaterThan(24);
  });
});

describe("getPost should get post detail", () => {
  it("should retrieve post detail based on id", async () => {
    const repository = new PostSQLRepositories();
    const res = await repository.getPost(testtedPostId);
    expect(Number(res.post_id)).toStrictEqual(testtedPostId);
  });
});
