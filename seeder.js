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

const iteration = parseInt(process.argv[2]) || 10;

async function seeder(knex) {
  const postsData = Array.from({ length: iteration }, () => ({
    body: faker.lorem.paragraphs({ min: 2, max: 4 }),
    title: faker.lorem.words({ min: 4, max: 10 }),
    author: faker.string.alphanumeric(10),
  }));

  const query = knex("posts").insert(postsData);
  // console.log(query.toSQL().sql);
  await query;
  console.log(`Inserted ${iteration} posts successfully.`);
  process.exit(0);
}

seeder(knexDB).catch((err) => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
