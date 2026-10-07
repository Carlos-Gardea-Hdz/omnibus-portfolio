import { expect, test } from "@playwright/test";

test("theme icon shows the mode the click switches to", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => localStorage.setItem("omnibus-theme", "light"));
  await page.goto("/", { waitUntil: "networkidle" });
  const icon = page.getByRole("button", { name: "Switch to dark mode" }).locator("svg.sun-moon-icon");
  await expect(icon).toHaveAttribute("data-moon", "true");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.getByRole("button", { name: "Switch to light mode" }).locator("svg.sun-moon-icon")).toHaveAttribute("data-moon", "false");
});
