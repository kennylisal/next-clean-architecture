"use server";
import { doLogOut } from "./action";
import { LogoutComponent } from "./logout";

export default async function LogoutPage() {
  return <LogoutComponent logOut={doLogOut} />;
}
