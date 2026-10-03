import { expect, test } from "@playwright/test";
import { expectAudibleNarration } from "./media-audio";

test("all six public videos play and project changes stop the old video", async ({ page }) => {
  test.setTimeout(120000);
  await page.goto("/project-room");
  await expect(page.getByRole("button", { name: /Français/ })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  for (const project of ["SLOT", "LABSPACE", "SIGNBRIDGE"]) {
    await page.getByRole("button", { name: project, exact: true }).click();
    for (const language of ["Français", "English"]) {
      await page.getByRole("button", { name: new RegExp(language) }).click();
      await page.getByRole("button", { name: "Play video", exact: true }).click();
      await expect(page.locator("video")).toHaveCount(1);
      await expect
        .poll(() => page.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime), {
          timeout: 15000,
        })
        .toBeGreaterThan(0.5);
      await expectAudibleNarration(page.locator("video"));
      await page.getByRole("button", { name: "Pause video", exact: true }).click();
      await expect
        .poll(() => page.locator("video").evaluate((v: HTMLVideoElement) => v.paused))
        .toBe(true);
    }
  }
  const links = await page
    .locator("a[href]")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(links.some((href) => href?.includes("localhost"))).toBe(false);
});
