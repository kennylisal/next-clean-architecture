"use server";
import { headers } from "next/headers";
import { getInjection } from "../../../../DI/container";
import { redirect } from "next/navigation";

export const doLogOut = async () => {
  try {
    const logoutController = getInjection("ISignOutController");
    const requestHeaders = await headers();
    const res = await logoutController(requestHeaders);

    if (res) {
      redirect("/login");
    }
  } catch (error) {
    throw error;
  }
};
