import { CreateDomain, Domain, DomainHeader } from "@/entities/models/domain";

export interface IDomainRepository {
  createDomain(domain: CreateDomain): Promise<boolean>;
  getDomainDetail(domainId: number): Promise<Domain>;
  getDomainsMember(domainId: number): Promise<number>;
  getDomainsHeader(domainId: number): Promise<DomainHeader>;
}
