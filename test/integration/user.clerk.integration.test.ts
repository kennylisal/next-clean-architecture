import { UserMetaData } from "@/entities/models/user";
import { UserRepositoryClerk } from "@/infrastructure/repositories/user.repository.clerk";
import { config } from "dotenv";
config({ path: ".env" });

describe("Clerk repo should be working", () => {
  const metaData: UserMetaData = {
    createdAt: new Date().toISOString(),
    role: "student",
  };
  it("should be able to update user data", async () => {
    const repo = new UserRepositoryClerk();
    const res = await repo.updateUserData(
      process.env.CLERK_USER_TEST || "",
      metaData
    );
    expect(res).toStrictEqual(true);
  });

  it("should be able to get user data", async () => {
    const repo = new UserRepositoryClerk();
    const res = await repo.getUserData(process.env.CLERK_USER_TEST || "");
    expect(res.role).toStrictEqual(metaData.role);
  });
});
