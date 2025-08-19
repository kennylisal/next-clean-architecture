"use server";

import { redirect } from "next/navigation";
import { getInjection } from "../../../../DI/container";
import { LoginUser } from "@/entities/models/user";

export const loginUser = async (loginData: LoginUser) => {
  try {
    const loginController = getInjection("ISignInController");
    const res = await loginController({
      user_email: loginData.user_email,
      user_password: loginData.user_password,
    });
    if (res) {
      console.log("login success");
      redirect("/posts");
    }
    console.log("login fail");
  } catch (error) {
    throw error;
  }
};
