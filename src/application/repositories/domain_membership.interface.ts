import {
  CreateDomainMembership,
  DomainMembership,
} from "@/entities/models/domain-membership";

export interface IDomainMembershipRepository {
  getDomainsMember(domainId: number): Promise<number>;
  getDomainMemberStatus(userId: string): Promise<DomainMembership>;
  createDomainMembership(schema: CreateDomainMembership): Promise<number>;
  getMembershipDetail(membershipId: number): Promise<DomainMembership>;
}
