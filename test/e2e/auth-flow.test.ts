import { base_url, url_route } from "@/route";
import { setupClerkTestingToken } from "@clerk/testing/playwright";
import { expect, test } from "@playwright/test";

test("should be able to acces public route", async ({ page }) => {
  await setupClerkTestingToken({ page });
  const res = await page.goto(`${base_url + url_route.login}}`);
  expect(res?.status()).toBe(200);
  await page.waitForSelector("[name='user_email']", { state: "visible" });
  const emailField = page.locator("[name='user_email']");
  //
  await expect(emailField).toBeVisible();
});

test("protected route should get redirected without user data", async ({
  page,
}) => {
  await setupClerkTestingToken({ page });
  await page.goto(`${base_url + url_route.posts}}`);
  await page.waitForURL("http://localhost:3000/login", {
    timeout: 2000,
  });
  expect(page.url()).toBe("http://localhost:3000/login");
});

test("should be able to access protected route after logging in", async ({
  page,
}) => {
  await setupClerkTestingToken({ page });
  const loginVisit = await page.goto(`${base_url + url_route.login}}`);
  expect(loginVisit?.status()).toBe(200);
  //
  await page.waitForSelector("[name='user_email']", { state: "visible" });
  const emailField = page.locator("[name='user_email']");
  await emailField.fill("kennylisal5@gmail.com");
  //
  await page.waitForSelector("[name='user_password']", { state: "visible" });
  const passField = page.locator("[name='user_password']");
  await passField.fill("Ipshield21");
  //
  await page.waitForSelector("[name='tombol']", { state: "visible" });
  const loginButton = page.locator("[name='tombol']");
  await loginButton.click();
  //
  await page.waitForURL(`${base_url + url_route.posts}`, {
    timeout: 2000,
  });
  expect(page.url()).toBe(`${base_url + url_route.posts}`);
});

//bikin login baru akses posts
