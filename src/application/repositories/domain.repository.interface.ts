import { CreateDomain, Domain, DomainHeader } from "@/entities/models/domain";

export interface IDomainRepository {
  createDomain(domain: CreateDomain): Promise<number>;
  getDomainDetail(domainId: number): Promise<Domain>;
  isDomainNameTaken(domainName: string): Promise<boolean>;
}
