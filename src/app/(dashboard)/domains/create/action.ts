"use server";
import { CreateDomain } from "@/entities/models/domain";
import { getInjection } from "../../../../../DI/container";
import { headers } from "next/headers";

export async function submitCreateDomain(input: CreateDomain) {
  const controller = getInjection("ICreateDomainController");
  const reqheaders = await headers();
  return await controller(input, reqheaders);
}
