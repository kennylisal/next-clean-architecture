import { CreateDomain, Domain, DomainHeader } from "@/entities/models/domain";
import { ITransaction } from "@/entities/models/transaction.interface";

export interface IDomainRepository {
  createDomain(domain: CreateDomain, trx?: ITransaction): Promise<number>;
  getDomainDetail(domainId: number): Promise<Domain>;
  isDomainNameTaken(domainName: string): Promise<boolean>;
}
