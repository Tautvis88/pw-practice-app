#### PREREQUISITES

1. Node.js
2. Git
3. IDE _(Visual Studio Code or Webstorm or IntelliJ Ultimate)_
4. Playwright plugin for IDE _(**Test Automation for IntelliJ**, Playwright Test for VSCode)_
5. **Playwright CRX** plugin for Chrome browser _(optional)_

---

#### PROJECT CREATION

1. Created folders _C:\UdemyCourses\Playwright_
2. Intellij → New Project from Version Control System → https://github.com/bondar-artem/pw-practice-app.git →   
   _(C:\UdemyCourses\Playwright\pw-practice-app)_
3. IntelliJ → renamed `master` branch to `main`
4. Create empty GitHub repository `pw-practice-app`: https://github.com/Tautvis88/pw-practice-app
   > Steps 4–6 were done using the advice from this link:  
   >> https://stackoverflow.com/questions/18200248/cloning-a-repo-from-someone-elses-github-and-pushing-it-to-a-repo-on-my-github
5. Intellij → Main Menu → Git → Manage Remotes... changed origin URL to my repo: https://github.com/Tautvis88/pw-practice-app
6. Push the main branch to my repo: _right mouse clicks on the main branch and select Push..._

---

### 17. PLAYWRIGHT INSTALLATION

1. Created `NOTES.md` file and described all performed steps.
2. Run `npm install --force` ('npm install' without --force didn't work - got many npm errors) to install node_modules
3. Run `npm start` to run web application on browser http://localhost:4200/
4. Run `npm init playwright@latest --force` to create playwright framework files. All newly created files added to Git versioning tracking.
5. **_example.spec.ts_** and **_tests-examples/demo-todo-app.spec.ts_** files were not deleted  
   (although during the Udemy Playwright course the lecturer deleted them)

---

### 18. TEST EXECUTION WITH CLI

1. Commented webkit _(Safari)_ browser project in `playwright.config.ts` because I don't have a Safari browser.

| No. | Command                                                  | Description                                                          |
|-----|----------------------------------------------------------|----------------------------------------------------------------------|
| 1.  | `npx playwright test`                                    | to run all tests from **_tests_** folder (no browser UI)             |
| 2.  | `npx playwright test --project=chromium`                 | to run tests only on Chrome browser (**_headless_** - no browser UI) |
| 3.  | `npx playwright test --project=chromium --headed`        | to run tests only on Chrome (**_headed_** - with browser UI)         |
| 4.  | `npx playwright test example.spec.ts --project=chromium` | to run only **_example.spec.ts_** file                               |
| 5.  | `npx playwright test -g "has title" --project=chromium`  | to run a specific test "has title" by the name of the test           |

``` bash
npx playwright test
```

``` bash
npx playwright test --project=chromium
```

``` bash
npx playwright test --project=chromium --headed
```

``` bash
npx playwright test example.spec.ts --project=chromium
```

``` bash
npx playwright test -g "has title" --project=chromium
```

2. To skip a specific test, you need to add `test.skip()`.
3. To run a specific test, you need to add `test.only()`.
4. To skip a specific test suite, you need to add `test.describe.skip()`.
5. To run a specific test suite, you need to add `test.describe.only()`.

---

### 19. TEST EXECUTION WITH UI

1. You can run e2e playwright tests from IntelliJ Ultimate using `Test Automation` plugin.  
   You need to click on a green arrow/triangle next to the test() or test.describe().

2. To run tests using the `Playwright UI runner`, you need to run this command:
``` bash
npx playwright test --ui
```
#### Disadvantages:
For each completed step, `Playwright UI runner` takes a screenshot of your application and displays them in the UI window.  
However, they aren't real pages, so you can't navigate them like you would in a regular browser.

#### Advantages:
You can use `Pick locator` button, click on the element in the screenshot and get locator code, for example: 
`getByRole('link', { name: 'Get started' })`

![Pick locator](resources/img/pick-locator.png)

---

### 20. TRACE VIEW AND DEBUG
You can't run `Playwright UI runner` on the CI server (pipeline). But you can turn on the `tracing mode` using this command:
```bash
npx playwright test --project=chromium --trace on
```
In the `playwright-report` folder, Playwright will create `trace` folder and `index.html` file.  
Open this `index.html` file on browser, click on the test, then on the `Traces` screenshot, and you will open `Playwright UI runner`.  
By default `trace` is set to `on-first-retry` in the `playwright.config.ts` file. You can change it to `on`, `off` etc.
See more here: [Recording a trace on CI](https://playwright.dev/docs/trace-viewer#recording-a-trace-on-ci)

#### DEBUGGER - Playwright Inspector
This command will open `Playwright Inspector` and browser window:
```bash
npx playwright test --project=chromium --debug
```
Using `Playwright Inspect` you will be able to run your test step by step / line by line clicking **_Step over_** button.
And all steps will be visualized in the browser window.

#### DEBUGGER - IDE built-in debugger
You can run debugger using built-in IDE debugger. You need to add a **_breakpoint_** where you want to stop your debugger,
click on the green triangle arrow, which is next to your test line number and select `Debug` mode.
While you are debugging, you can hover your mouse arrow on variables to see what value it holds inside.

---

### 21. TESTS STRUCTURE
Check the test file `firstTest.spec.ts`. 
```ts
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
```

---

### 22. HOOKS and FLOW CONTROL
Check the test file `firstTest.spec.ts`.
```ts
test.beforeAll(async ({ page }) => {  // executed just ONCE in the ENTIRE test file before all tests
});

test.beforeEach(async ({ page }) => {
});

test.afterEach() // try to avoid using this (not a good practice)
test.afterAll()  // try to avoid using this (not a good practice)
```
```ts
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  // this beforeEach will be executed before EACH test (before "Form Layouts", before "Datepicker", before "Chart Layouts", before "Chartpicker").
});

test.describe('suite1', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    // this beforeEach will be executed only before "Form Layouts" and before "Datepicker".
  });

  test("the first test", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });

  test("navigate to datepicker page", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
})

test.describe('suite2', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Charts").click();
    // this beforeEach will be executed only before "Chart Layouts" and before "Chartpicker".
  });

  test("the first test", async ({ page }) => {
    await page.getByText("Chart Layouts").click();
  });

  test("navigate to datepicker page", async ({ page }) => {
    await page.getByText("Chartpicker").click();
  });
})
```

---

### 23. DOM Terminology
#### Check the PowerPoint presentation `23. DOM Terminology` in the `C:\UdemyCourses\Playwright\` or `resources/ppt/23. DOM Terminology.pptx`.
![HTML Tags, Attributes](resources/img/DOM-terms-1.png)
&nbsp;

#### A `class` and `id` attributes in HTML have a special role (more important than others). `id` attribute should be unique.
![Class, ID attributes](resources/img/DOM-terms-2.png)
&nbsp;

#### A `class` attribute can consist of more than one independent value separated by spaces:
![Class values](resources/img/DOM-terms-3.png)
&nbsp;

#### HTML table tags: `<tbody>` - whole table, `<tr>` - table row, `<td>` - table cell/data.
![HTML Table Tags](resources/img/DOM-terms-4.png)
&nbsp;

#### HTML text which you see in the website can be stored as a hardcoded text between the angle braces in the plain HTML file  
#### `<td>html text between the angle braces</td>` or as a value inside the HTML attribute.
![HTML text value](resources/img/DOM-terms-5.png)
&nbsp;

#### Parent Elements and Child Elements
![Relations between the web elements](resources/img/DOM-terms-6.png)
&nbsp;

#### Sibling Elements
![Sibling elements](resources/img/DOM-terms-7.png)
&nbsp;

### DOM elements SUMMARY
* HTML DOM consists of: `HTML Tags`, `HTML Attributes` and `Attribute values`
* `class` and `id` are also HTML attribute names
* `class` attribute can have several values and each value is separated by space
* HTML tags usually come in pairs of Opening `<..>` and Closing `</..>` tag. Closing tag has the same name and forward slash.
* Value in between angle brackets (`>here<`) is a plain text.
* Elements above the "key" web element are `Parent Elements`.
* Elements inside the "key" web element are `Child Elements`.
* Elements placed at the same level side by side are Sibling Elements.

---

### 24. Locator Syntax Rules
Check the test `Locator syntax rules` in the `firstTest.spec.ts` file.







