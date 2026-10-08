import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const ROUTES = ["/"];

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
] as const;

const THEMES = ["light", "dark"] as const;

const MIN_TARGET_PX = 24;

async function openIn(page: Page, route: string, theme: (typeof THEMES)[number]) {
  await page.emulateMedia({ colorScheme: theme });
  await page.addInitScript((t) => {
    try {
      localStorage.setItem("omnibus-theme", t);
    } catch {}
    document.documentElement.classList.toggle("dark", t === "dark");
  }, theme);
  await page.goto(route, { waitUntil: "networkidle" });
  await page.evaluate((t) => document.documentElement.classList.toggle("dark", t === "dark"), theme);
  // The app animates theme and entrance changes (CSS and motion JS); axe would sample mid-transition colors.
  await page.addStyleTag({ content: "*,*::before,*::after{transition:none!important;animation:none!important}" });
  await page.waitForTimeout(1000);
}

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    for (const theme of THEMES) {
      test.describe(`${route} @ ${vp.name} ${vp.width}px, ${theme}`, () => {
        test.use({ viewport: { width: vp.width, height: vp.height } });

        test.beforeEach(async ({ page }) => {
          await openIn(page, route, theme);
        });

        test("does not scroll horizontally", async ({ page }) => {
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
          );
          expect(overflow).toBeLessThanOrEqual(0);
        });

        test(`interactive targets are at least ${MIN_TARGET_PX}px (WCAG 2.5.8)`, async ({ page }) => {
          const small = await page.evaluate((min) => {
            const selector = "a[href], button, input:not([type=hidden]), select, textarea, [role=button], [role=link]";
            return [...document.querySelectorAll<HTMLElement>(selector)]
              .filter((el) => {
                const r = el.getBoundingClientRect();
                const visible = r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
                const inline = getComputedStyle(el).display === "inline" && el.tagName === "A";
                const clipped = getComputedStyle(el).clip !== "auto";
                return visible && !inline && !clipped && (r.width < min || r.height < min);
              })
              .map((el) => `${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 30)}"`);
          }, MIN_TARGET_PX);
          expect(small, `targets under ${MIN_TARGET_PX}px`).toEqual([]);
        });

        test("has no axe violations", async ({ page }) => {
          const results = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze();
          expect(results.violations.map((v) => `${v.id} (${v.nodes.length}) ${v.nodes.slice(0,3).map((n) => n.target.join(" ") + " " + (n.any[0]?.message ?? "")).join(" | ")}`)).toEqual([]);
        });

        test("captures a screenshot", async ({ page }, info) => {
          const slug = route === "/" ? "home" : route.replace(/\W+/g, "-").replace(/^-|-$/g, "");
          await page.screenshot({
            path: info.outputPath(`${slug}-${vp.name}-${theme}.png`),
            fullPage: true,
          });
        });
      });
    }
  }
}
