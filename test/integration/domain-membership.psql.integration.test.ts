//all the test inside of it follows these 3 basic structure
//arrange -> preparing / aranging data
//act -> gathering data or executing something to be tested

import { CreateDomain } from "@/entities/models/domain";
import { CreateDomainMembership } from "@/entities/models/domain-membership";
import knexDB from "@/infrastructure/config/knex_db";
import { DomainsMembershipSQLRepositories } from "@/infrastructure/repositories/domain-membership.repository.sql";

//4 member 2020
//3 member 2021
describe("DomainMembershipSQLRepositories Integration Tests", () => {
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
  const memberData: CreateDomainMembership[] = [
    {
      domain_id: 2020,
      member_id: "anggota-x",
      membership_status: "active",
      member_role: "creator",
    },
    {
      domain_id: 2020,
      member_id: "anggota-a",
      membership_status: "active",
      member_role: "member",
    },
    {
      domain_id: 2020,
      member_id: "anggota-b",
      membership_status: "active",
      member_role: "member",
    },
    {
      domain_id: 2020,
      member_id: "anggota-F",
      membership_status: "active",
      member_role: "member",
    },
    {
      domain_id: 2021,
      member_id: "anggota-a",
      membership_status: "active",
      member_role: "member",
    },
    {
      domain_id: 2021,
      member_id: "anggota-y",
      membership_status: "active",
      member_role: "creator",
    },
  ];
  beforeAll(async () => {
    await knexDB.raw(
      "TRUNCATE TABLE domains, domains_membership, posts RESTART IDENTITY CASCADE"
    );
    try {
      await knexDB("domains").insert(domains);
      await knexDB("domains_membership").insert(memberData);
    } catch (error) {
      throw error;
    }
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

  it("should be able to insert data", async () => {
    const repo = new DomainsMembershipSQLRepositories();

    const data: CreateDomainMembership = {
      domain_id: 2021,
      member_id: "anggota-test",
      membership_status: "active",
      member_role: "member",
    };
    const res = await repo.createDomainMembership(data);
    expect(res).toStrictEqual(7);
  });

  it("should get domain member count", async () => {
    const repo = new DomainsMembershipSQLRepositories();
    const res = await repo.getDomainMemberCount(domains[0].domain_id!);
    expect(res).toStrictEqual(4);
  });

  it("should be able to get member status wiht domain ID + member ID", async () => {
    const repo = new DomainsMembershipSQLRepositories();
    const res = await repo.getDomainMemberStatus(
      memberData[0].member_id,
      domains[0].domain_id!
    );
    expect(res?.domain_id).toStrictEqual(memberData[0].domain_id);
    expect(res?.domain_id).toStrictEqual(domains[0].domain_id!);
  });

  it("should be able to get member status with membership id", async () => {
    const repo = new DomainsMembershipSQLRepositories();
    const res = await repo.getMembershipDetail(1);
    expect(res?.domain_id).toStrictEqual(memberData[0].domain_id);
    expect(res?.member_id).toStrictEqual(memberData[0].member_id);
    expect(res?.member_role).toStrictEqual(memberData[0].member_role);
  });

  //this will test with memberId -> "anggota-a" | located in memberData[1]
  it("should be able to get all user membership to his subscribed domains", async () => {
    const repo = new DomainsMembershipSQLRepositories();
    const res = await repo.getUserMemberships(memberData[1].member_id);
    expect(res).toHaveLength(2);
  });
});
