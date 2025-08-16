import { test, expect } from "@playwright/test";

test.describe("Navigation Tests", () => {
  test("should navigate to home page", async ({ page }) => {
    await page.goto("/");

    // Check if main elements are visible
    await expect(page.locator("h1")).toContainText("KhadamatK");
    await expect(page.getByRole("link", { name: "Services" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Providers" })).toBeVisible();
  });

  test("should navigate to services page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Services");

    await expect(page).toHaveURL("/services");
    await expect(page.locator("h1")).toContainText("Services");
  });

  test("should navigate to providers page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Providers");

    await expect(page).toHaveURL("/providers");
    await expect(page.locator("h1")).toContainText("Providers");
  });

  test("should navigate to login page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Login");

    await expect(page).toHaveURL("/login");
    await expect(page.locator("h1")).toContainText("Login");
  });

  test("should navigate to register page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Register");

    await expect(page).toHaveURL("/register");
    await expect(page.locator("h1")).toContainText("Register");
  });

  test("should handle 404 page", async ({ page }) => {
    await page.goto("/non-existent-page");

    await expect(page.locator("h1")).toContainText("404");
    await expect(page.getByRole("link", { name: "Go Home" })).toBeVisible();
  });
});
