// seeds/seeder.js
const { faker } = require("@faker-js/faker");

const knex = require("knex");

require("dotenv").config({ path: "./.env.example" });

const knexDB = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});

const iteration = parseInt(process.argv[2]) || 22;

async function seeder(knex) {
  const domains = [
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
  const domainArr = await knexDB("domains")
    .insert(domains)
    .returning("domain_id");
  // console.log(domainArr);
  const postsData = Array.from({ length: iteration }, () => ({
    body: faker.lorem.paragraphs({ min: 2, max: 4 }),
    title: faker.lorem.words({ min: 4, max: 10 }),
    author: faker.string.alphanumeric(10),
    domain_id: "2020",
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
  // console.log(query.toSQL().sql);
  console.log(`Inserted ${iteration} posts successfully.`);
  process.exit(0);
}

seeder(knexDB).catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
