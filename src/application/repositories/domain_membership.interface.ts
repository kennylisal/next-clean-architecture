import {
  CreateDomainMembership,
  DomainMembership,
} from "@/entities/models/domain-membership";

export interface IDomainMembershipRepository {
  getDomainsMember(domainId: number): Promise<number>;
  getDomainMemberStatus(
    member_id: string,
    domain_id: number
  ): Promise<DomainMembership | undefined>;
  createDomainMembership(schema: CreateDomainMembership): Promise<number>;
  getMembershipDetail(membershipId: number): Promise<DomainMembership>;
  getUserMemberships(userId: string): Promise<DomainMembership[]>;
}
