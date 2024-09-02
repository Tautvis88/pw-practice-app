import { test } from "@playwright/test";

test("the first test", async ({ page }) => {
  // async because await can be used only in asynchronous functions

  /* { page } is one of Playwright fixtures. We also have { browser } fixture.
   * { page } fixture is like blank page of the browser.
   * To run the test, we need to open a new page of the browser,
   * and then we can do with this page whatever we want. */

  // FIRST RUN the application with "npm start"
  await page.goto("http://localhost:4200/");
  // await because method .goto returns a Promise
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});
