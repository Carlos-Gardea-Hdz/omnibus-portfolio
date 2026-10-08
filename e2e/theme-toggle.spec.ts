import { expect, test } from "@playwright/test";

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`theme toggle flips the dark class (${reducedMotion})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light", reducedMotion });
    await page.addInitScript(() => localStorage.setItem("omnibus-theme", "light"));
    await page.goto("/", { waitUntil: "networkidle" });
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/dark/);
    await page.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(html).toHaveClass(/dark/);
    await page.getByRole("button", { name: "Switch to light mode" }).click();
    await expect(html).not.toHaveClass(/dark/);
  });
}
