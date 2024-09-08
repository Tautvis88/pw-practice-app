import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  // Run the application on http://localhost:4200/ using "npm start"
  // Run the Playwright UI Runner using "npx playwright test --ui"

  // by HTML Tag name
  await page.locator("input").first().click(); // first() because Playwright finds many <input> tags

  // by ID (#)
  page.locator("#inputEmail1");

  // by Class value (.)
  page.locator(".shape-rectangle");

  // by attribute [attribute]
  page.locator("[fullwidth]");

  // by attribute value [attribute="value"]
  page.locator('[placeholder="Email"]');

  // by Entire Class value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

  // combine different selectors (do not add a space between them)
  page.locator('input[placeholder="Email"].shape-rectangle[fullwidth]');

  // by XPath (NOT RECOMMENDED --> https://playwright.dev/docs/other-locators#xpath-locator)
  page.locator('//*[@id="inputEmail1"]');

  // by partial text match
  page.locator(':text("Using")');

  // by exact text match
  page.locator(':text-is("Using the Grid")');
});
