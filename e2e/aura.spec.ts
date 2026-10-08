import { expect, test } from "@playwright/test";

test("aura background is decorative and does not capture input", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const aura = page.locator(".aura-bg");
  await expect(aura).toHaveAttribute("aria-hidden", "true");
  expect(await aura.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const anim = await page.locator(".aura-blob").first().evaluate((el) => getComputedStyle(el).animationName);
  expect(anim).toBe("none");
});
