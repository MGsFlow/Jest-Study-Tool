import { test, expect } from "@playwright/test";

test.describe("Jest 학습 앱 E2E", () => {
  test("대시보드에 제목이 보인다", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Jest 학습 대시보드" })
    ).toBeVisible();
  });

  test("Chapter 1 학습 페이지로 이동", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Chapter 1/ }).first().click();
    await expect(
      page.getByRole("heading", { name: "Jest 기초" })
    ).toBeVisible();
  });

  test("도전 과제 페이지 접근", async ({ page }) => {
    await page.goto("/challenges");
    await expect(
      page.getByRole("heading", { name: "도전 과제" })
    ).toBeVisible();
  });

  test("치트시트 검색", async ({ page }) => {
    await page.goto("/cheatsheet");
    await page.getByPlaceholder("검색").fill("toBe");
    await expect(page.getByText("자주 쓰는 Matcher")).toBeVisible();
  });
});
