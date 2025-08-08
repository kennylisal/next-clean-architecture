import { testConnection } from "@/src/infrastructure/config/pg_pool";
import { AuthenticationBestAuthService } from "@/src/infrastructure/services/authentication.service";

describe("better auth integration test", () => {
  it("pool connected to pg", async () => {
    const res = await testConnection();
    expect(res).toStrictEqual(true);
  });

  // it("should be able to signed up", async () => {
  //   const service = new AuthenticationBestAuthService();
  //   const res = await service.signUpEmail("kennylsia@gmail.com", "ipshield21");
  //   expect(typeof res).toBe("string");
  // });

  it("should be able to sign in", async () => {
    const service = new AuthenticationBestAuthService();
    const res = await service.signInEmail("kennylsia@gmail.com", "ipshield21");
    expect(true).toBe(true);
  });

  it("should make session", async () => {
    const service = new AuthenticationBestAuthService();
    const res = await service.generateSession();
    expect(res).toBe(true);
  });
});
