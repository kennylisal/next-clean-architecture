import { CreateDomain } from "@/entities/models/domain";
import knexDB from "@/infrastructure/config/knex_db";
import { faker } from "@faker-js/faker";

const iteration = parseInt(process.argv[2]) || 22;

async function seeder() {
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
  const domainArr: { domain_id: number }[] = await knexDB("domains")
    .insert(domains)
    .returning("domain_id");
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
  await knexDB("posts").insert([...postsData, ...dataForTesting]);
  console.log(`Inserted ${iteration} posts successfully.`);
  process.exit(0);
}

seeder().catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
