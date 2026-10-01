import { test, expect } from "@playwright/test";
test("a parent and child predict, explore and keep a discovery", async ({ page }) => {
  await page.goto("/explore/motion?age=4-6");
  await page.getByRole("button", { name: "Let’s try it", exact: true }).click();
  await expect(
    page.getByText("Choose what you think will happen first. Every guess is welcome."),
  ).toBeVisible();
  await page.getByRole("button", { name: "On Earth", exact: true }).click();
  await page.getByRole("button", { name: "See the result", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "A smaller pull. A bigger journey." }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: /What did you notice/ })
    .fill("The same push travelled farther on the Moon.");
  await page.getByRole("button", { name: "Keep our discovery" }).click();
  await page.getByRole("link", { name: "Open our discoveries" }).click();
  await expect(
    page.getByText("The same push travelled farther on the Moon.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Try these settings again" }).click();
  await expect(page).toHaveURL(/settings=/);
  await page.getByLabel("Exploring with").selectOption("10-14");
  await expect(page.getByRole("slider").first()).toBeVisible();
});
test("planner labels curated activities and refuses absent modules", async ({
  request,
  baseURL,
}) => {
  const options = {
    headers: { Origin: baseURL! },
    data: { prompt: "Create a gravity experiment", age: "4-6", parent: true },
  };
  const response = await request.post("/api/plan", options);
  expect(response.ok()).toBe(true);
  expect((await response.json()).source).toBe("curated");
  expect(
    (
      await request.post("/api/plan", {
        ...options,
        data: { ...options.data, prompt: "Create a dinosaur DNA laboratory" },
      })
    ).status(),
  ).toBe(422);
  expect(
    (
      await request.post("/api/plan", { ...options, data: { ...options.data, parent: false } })
    ).status(),
  ).toBe(400);
});
