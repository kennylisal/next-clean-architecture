import { testConnection } from "@/infrastructure/config/pg_pool";
import { BetterAuthAuthenticationServices } from "@/infrastructure/services/authentication.service.better-auth";
import { faker } from "@faker-js/faker";

describe("better auth authentication service integration test", () => {
  it("should be connected to DB", async () => {
    const res = await testConnection();
    expect(res).toBe(true);
  });
  // const mockEmail = faker.internet.email();
  const mockPassword = "ipshield21";
  const mockEmail = "testingee@gmail.com";
  it("could sign user up", async () => {
    const service = new BetterAuthAuthenticationServices();

    const res = await service.signUpEmail(mockEmail, mockPassword);
    expect(typeof res).toBe("string");
  });

  // it("could sign user in", async () => {
  //   const service = new BetterAuthAuthenticationService();
  //   const res = await service.signInEmail(mockEmail, mockPassword);
  //   expect(res).toBe(true);
  // });
});
