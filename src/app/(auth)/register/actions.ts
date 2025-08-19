"use server";
import { CreateUser } from "@/entities/models/user";
import { getInjection } from "../../../../DI/container";
import { redirect } from "next/navigation";

export const signUpUser = async (data: CreateUser) => {
  try {
    const signUpController = getInjection("ISignUpController");
    const res = await signUpController(data);
    if (res) {
      console.log("signup success");
      redirect("/login");
    }
    console.log("signup fail");
  } catch (error) {
    throw error;
  }
};
