// tes redirect untuk halaman protected
//tes register -> login -> terus access protected
import { base_url, url_route } from "@/utils/route";
import { base, faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";

test("Prevent access to protected route when not logged in", async ({
  page,
}) => {
  await page.goto(`${base_url + url_route.posts}`);
  await page.waitForURL(`${base_url + url_route.login}`, {
    timeout: 2000,
  });
  expect(page.url()).toBe(`${base_url + url_route.login}`);
});

test("perform login and redirected to /posts", async ({ page }) => {
  const mockEmail = "testingee@gmail.com";
  const mockPassword = "ipshield21";
  const loginVisit = await page.goto(`${base_url + url_route.login}`);
  expect(loginVisit?.status()).toBe(200);
  await page.waitForSelector("[name='user_email']", { state: "visible" });
  const logEmailField = page.locator("[name='user_email']");
  await logEmailField.fill(mockEmail);
  await page.waitForSelector("[name='user_password']", { state: "visible" });
  const logPassField = page.locator("[name='user_password']");
  await logPassField.fill(mockPassword);
  await page.waitForSelector("[name='tombol']", { state: "visible" });
  const loginButton = page.locator("[name='tombol']");
  await loginButton.click();
  //
  //do access protected route
  //
  console.log(page.url());
  await page.waitForURL(`${base_url + url_route.posts}`, {
    timeout: 5000,
  });
  expect(page.url()).toBe(`${base_url + url_route.posts}`);
});

// test("should be able to access protected route after logging in", async ({
//   page,
// }) => {
//   //arrange
//   const mockEmail = faker.internet.email();
//   const mockPassword = "ipshield21";
//   //
//   //do register
//   //
//   const registerVisit = await page.goto(`${base_url + url_route.register}`);
//   expect(registerVisit?.status()).toBe(200);
//   await page.waitForSelector("[name='user_email']", { state: "visible" });
//   const regEmailField = page.locator("[name='user_email']");
//   await regEmailField.fill(mockEmail);
//   await page.waitForSelector("[name='user_password']", { state: "visible" });
//   const regPassField = page.locator("[name='user_password']");
//   await regPassField.fill(mockPassword);
//   await page.waitForSelector("[name='tombol']", { state: "visible" });
//   const registerButton = page.locator("[name='tombol']");
//   //Select Role
//   const roleSelect = await page.waitForSelector("[name='role']");
//   roleSelect.selectOption("admin");
//   //
//   await registerButton.click();
//   //
//   //do login
//   //
//   const loginVisit = await page.goto(`${base_url + url_route.login}`);
//   expect(loginVisit?.status()).toBe(200);
//   await page.waitForSelector("[name='user_email']", { state: "visible" });
//   const logEmailField = page.locator("[name='user_email']");
//   await logEmailField.fill("kennylisal5@gmail.com");
//   await page.waitForSelector("[name='user_password']", { state: "visible" });
//   const logPassField = page.locator("[name='user_password']");
//   await logPassField.fill("Ipshield21");
//   await page.waitForSelector("[name='tombol']", { state: "visible" });
//   const loginButton = page.locator("[name='tombol']");
//   await loginButton.click();
//   //
//   //do access protected route
//   //
//   console.log(page.url());
//   await page.waitForURL(`${base_url + url_route.posts}`, {
//     timeout: 5000,
//   });
//   expect(page.url()).toBe(`${base_url + url_route.posts}`);
// });
