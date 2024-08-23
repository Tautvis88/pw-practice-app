1. Prerequisites (already installed):
   1. Node.js
   2. Git
   3. IDE (Visual Studio Code or Webstorm or IntelliJ Ultimate)
   4. Playwright plugin for IDE (Test Automation for IntelliJ, Playwright Test for VSCode)
   5. Playwright CRX plugin for Chrome browser (optional)
2. Created folders C:\UdemyCourses\Playwright
3. Intellij → New Project from Version Control System → https://github.com/bondar-artem/pw-practice-app.git → C:\UdemyCourses\Playwright\pw-practice-app
4. Intellij → renamed 'master' branch to 'main'
5. Create empty GitHub repository "pw-practice-app": https://github.com/Tautvis88/pw-practice-app
   1. Steps 4-6 were done using the advices from this link:: https://stackoverflow.com/questions/18200248/cloning-a-repo-from-someone-elses-github-and-pushing-it-to-a-repo-on-my-github
6. Intellij → Main Menu → Git → Manage Remotes... changed origin URL to my repo: https://github.com/Tautvis88/pw-practice-app
7. Push the main branch to my repo: right mouse clicks on the main branch and select Push... 
8. Created NOTES.md file and described all performed steps.
9. Run `npm install --force` ('npm install' without --force didn't work - got many npm errors)
10. Run `npm start` to run web application on browser http://localhost:4200/
11. Run `npm init playwright@latest --force`, all newly created files added to Git versioning tracking.
12. **_example.spec.ts_** and **_tests-examples/demo-todo-app.spec.ts_** files were not deleted (although during the Udemy Playwright course the lecturer deleted them)

