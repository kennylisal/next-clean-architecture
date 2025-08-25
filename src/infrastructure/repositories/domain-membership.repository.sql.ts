import { IDomainMembershipRepository } from "@/application/repositories/domain_membership.interface";
import {
  DomainMembership,
  CreateDomainMembership,
} from "@/entities/models/domain-membership";
import knexDB from "../config/knex_db";
import executeQuery from "../utils/query-helper";
import { Knex } from "knex";
import { PSQLTransaction } from "../services/transaction-manager.service.psql";
import { IInstrumentationService } from "@/application/services/instrumentation.service..interface";
import { ICrashResporterServices } from "@/application/services/crash-reporter.service.interface";

export class DomainsMembershipSQLRepositories
  implements IDomainMembershipRepository
{
  constructor(
    private readonly instrumentationService: IInstrumentationService,
    private readonly crashReporterService: ICrashResporterServices
  ) {}
  async getDomainMemberStatus(
    member_id: string,
    domain_id: number,
    trx?: Knex.Transaction
  ): Promise<DomainMembership> {
    return await this.instrumentationService.startSpan(
      { name: "domainMembersip Repository > getDomainMemberStatus" },
      async () => {
        const db = trx || knexDB;
        const query = db("domains_membership")
          .where({
            member_id: member_id,
            domain_id: domain_id,
          })
          .first();
        return await executeQuery(
          query,
          "READ",
          "domains_membership",
          this.crashReporterService
        );
      }
    );
  }
  async getDomainMemberCount(domainId: number): Promise<number> {
    return await this.instrumentationService.startSpan(
      { name: "domainMembership Repository > getDomainMemberCount" },
      async () => {
        const query = knexDB("domains_membership")
          .where("domain_id", "=", domainId)
          .count("* as count");
        const result = (await executeQuery(
          query,
          "READ",
          "domains_membership",
          this.crashReporterService
        )) as [{ count: number }];

        return Number(result[0].count);
      }
    );
  }
  async createDomainMembership(
    schema: CreateDomainMembership,
    trx?: PSQLTransaction
  ): Promise<number> {
    return this.instrumentationService.startSpan(
      { name: "domainMembership Repository > createDomainmembership" },
      async () => {
        const db = trx?.trxInstance || knexDB;
        const query = db("domains_membership")
          .insert(schema)
          .returning("membership_id");

        const result: { membership_id: number }[] = await executeQuery(
          query,
          "INSERT",
          "domains_membership",
          this.crashReporterService
        );
        return Number(result[0].membership_id);
      }
    );
  }
  async getMembershipDetail(membershipId: number): Promise<DomainMembership> {
    return await this.instrumentationService.startSpan(
      { name: "domainmMembership repository > getMemebrshipDetail" },
      async () => {
        const query = knexDB("domains_membership")
          .where("membership_id", "=", membershipId)
          .first();
        return await executeQuery(
          query,
          "INSERT",
          "domains_memebrhsip",
          this.crashReporterService
        );
      }
    );
  }
  async getUserMemberships(userId: string): Promise<DomainMembership[]> {
    return await this.instrumentationService.startSpan(
      { name: "domainMemebrship repository ? getUserMemebrshiop" },
      async () => {
        const query = knexDB("domains_membership").where(
          "member_id",
          "=",
          userId
        );
        return await executeQuery(
          query,
          "INSERT",
          "domains_membership",
          this.crashReporterService
        );
      }
    );
  }
}
