import { config } from "dotenv";
config({ path: ".env" });

export const base_url = process.env.BASE_URL || "http://localhost:3000";

export const url_route = {
  login: "/login",
  posts: "/posts",
};
