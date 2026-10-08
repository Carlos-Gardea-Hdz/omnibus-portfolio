import { expect, test } from "@playwright/test";

const CASES = [
  { scheme: "light", locale: "en-US", dark: false, lang: "en" },
  { scheme: "dark", locale: "es-MX", dark: true, lang: "es" },
] as const;

for (const c of CASES) {
  test(`hydrates without errors and applies preferences (${c.scheme}, ${c.locale})`, async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: c.scheme, locale: c.locale });
    const page = await context.newPage();
    const problems: string[] = [];
    page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning") problems.push(`${m.type()}: ${m.text()}`);
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("lang", c.lang);
    await expect(page.locator("html")).toHaveClass(c.dark ? /dark/ : /^(?!.*dark).*$/);
    await expect(page.locator("h1")).toBeVisible();
    expect(problems).toEqual([]);
    await context.close();
  });
}
