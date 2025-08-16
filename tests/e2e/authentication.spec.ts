import { test, expect } from "@playwright/test";

test.describe("Authentication Tests", () => {
  test("should display login form", async ({ page }) => {
    await page.goto("/login");

    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("should display register form", async ({ page }) => {
    await page.goto("/register");

    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: "Register" })).toBeVisible();
  });

  test("should show validation errors for empty fields", async ({ page }) => {
    await page.goto("/login");

    await page.click("text=Login");

    // Should show validation errors
    await expect(page.locator(".text-red-500")).toBeVisible();
  });

  test("should show validation errors for invalid email", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "invalid-email");
    await page.fill('input[name="password"]', "password123");
    await page.click("text=Login");

    // Should show email validation error
    await expect(page.locator(".text-red-500")).toBeVisible();
  });

  test("should handle successful login", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");

    // Mock successful login response
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          token: "mock-token",
          user: { id: 1, name: "Test User", role: "client" },
        }),
      });
    });

    await page.click("text=Login");

    // Should redirect to home page after successful login
    await expect(page).toHaveURL("/");
  });

  test("should handle login failure", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "wrongpassword");

    // Mock failed login response
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ message: "Invalid credentials" }),
      });
    });

    await page.click("text=Login");

    // Should show error message
    await expect(page.locator(".text-red-500")).toBeVisible();
  });
});
