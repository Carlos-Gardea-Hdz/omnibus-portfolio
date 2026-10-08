import { expect, test } from "@playwright/test";

// With the app bundle blocked we see exactly what the browser paints before
// hydration: the prerendered HTML plus the inline head script.
const CASES = [
  { name: "stored dark preference", scheme: "light", stored: "dark", dark: true },
  { name: "system dark, nothing stored", scheme: "dark", stored: null, dark: true },
  { name: "stored light beats system dark", scheme: "dark", stored: "light", dark: false },
  { name: "system light, nothing stored", scheme: "light", stored: null, dark: false },
] as const;

function luminance(rgb: string): number {
  const [r, g, b] = rgb.match(/\d+(\.\d+)?/g)!.slice(0, 3).map(Number);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

for (const c of CASES) {
  test(`first frame before hydration: ${c.name}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: c.scheme });
    if (c.stored) await page.addInitScript((t) => localStorage.setItem("omnibus-theme", t), c.stored);
    await page.route("**/*.js", (route) => route.abort());
    await page.goto("/", { waitUntil: "load" });

    const html = page.locator("html");
    if (c.dark) await expect(html).toHaveClass(/dark/);
    else await expect(html).not.toHaveClass(/dark/);

    const bg = await page.evaluate(() => getComputedStyle(document.querySelector("#root > div")!).backgroundColor);
    if (c.dark) expect(luminance(bg)).toBeLessThan(60);
    else expect(luminance(bg)).toBeGreaterThan(200);
  });
}

test("dark class is never removed while the app hydrates", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    (window as unknown as { __lightFrames: number }).__lightFrames = 0;
    const check = () => {
      if (document.documentElement && !document.documentElement.classList.contains("dark")) {
        (window as unknown as { __lightFrames: number }).__lightFrames++;
      }
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => (window as unknown as { __lightFrames: number }).__lightFrames)).toBe(0);
});
