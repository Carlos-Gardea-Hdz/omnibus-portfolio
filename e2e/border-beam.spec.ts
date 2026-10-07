import { expect, test } from "@playwright/test";

test("production cards get a decorative border beam, none when motion is reduced", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const beam = page.locator(".border-beam").first();
  await expect(beam).toHaveAttribute("aria-hidden", "true");
  expect(await beam.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe("none");

  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await beam.evaluate((el) => getComputedStyle(el).opacity)).toBe("0");
});
