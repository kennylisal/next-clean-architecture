import { CreateDomain } from "@/entities/models/domain";
import knexDB from "@/infrastructure/config/knex_db";
import { DomainsSQLRepositories } from "@/infrastructure/repositories/domains.repository.sql";

//all the test inside of it follows these 3 basic structure
//arrange -> preparing / aranging data
//act -> gathering data or executing something to be tested
//assert => testing the result of act
describe("DomainSQLRepositories Integration Tests", () => {
  beforeAll(async () => {
    await knexDB.raw("TRUNCATE TABLE posts, domains RESTART IDENTITY CASCADE");
  });
  const domainData: CreateDomain = {
    description: "deskripsi domain 1",
    domain_name: "general",
    domain_visibility: "public",
    domain_id: 2020,
    domain_status: "active",
    membership_acceptance: "open",
  };

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

  it("should be able to insert data", async () => {
    const repo = new DomainsSQLRepositories();
    const res = await repo.createDomain(domainData);
    expect(res).toStrictEqual(domainData.domain_id);
  });

  it("should retrieve domain detail", async () => {
    const repo = new DomainsSQLRepositories();
    const res = await repo.getDomainDetail(domainData.domain_id!);
    console.log("getDomainDetail result:", JSON.stringify(res, null, 2));
    expect(res.domain_id).toStrictEqual(domainData.domain_id!);
  });

  afterAll(async () => {
    await knexDB.raw("TRUNCATE TABLE posts, domains RESTART IDENTITY CASCADE");
  });
});
