# Instructions and Notes

**Setup Git Repo**

1. Git commands

- git init
- git status
- git add
- git commit -m "<commit-message>"'

2. git ignore the following files

- /debug
- logs/
- .env
- allure-results
- tests-examples/
- example .\*
- \*. log

**Push Changes to Remote**

1. Git commands

- `git branch -M main'
- git remote add origin <remote-url>
- git remote -v'
- `git push -u origin main"

2. Issues

- git config -- list
- git push -forigin main' -> force push

3. Remember this - `ACP` - `Add commit push`

**Writing First Test**

1. Target web app: https://katalon-demo-cura.herokuapp.com/
2. Steps
   1. Go to the home page
   2. Assert if the title is correct
   3. Assert header text
3. Done!

**Common Errors**

1. Spec/test file not having `.spec or .test` init
2. Navigation timeout error
   ```ts
   use: {
       navigationTimeout: 30_000, // Set timeout to 30 seconds
   },
   ```
3. Missing `await` keyword before action methods
4. Done !

**Option 1 - Install VS Code Extension**

1. VS Code Extension -> Playwright Test for VSCode

**Option 2 - CLI**

- Help -> `npx playwright codegen -- help`
- CLI basic command - `npx playwright codegen`
- With URL `npx playwright codegen https://katalon-demo-cura.herokuapp.com/`

**Interacting With Web Elements**

- codegen CLI: `npx playwright codegen https://katalon-demo-cura.herokuapp.com/`

**Allure Setup**

1. Check if allure is installed globally -> `allure --version`, if not present
2. Install allure commandline globally -> `npm install -g allure-commandline`
3. Install 'Allure' Reporter for project level - `npm install -D allure-playwright`
4. Add it in the config file

```ts
reporter: [
    ['html'],               // Default Playwright HTML reporter
    ['allure-playwright'],  // Allure reporter
],
```

6. Run a test and confirm that the new folder is created `allure-results`
7. Spin up the report -> `allure serve`
8. Done!

** Allure Advanced Setup **
For more detailed reporting, you can configure additional options:

```ts
reporter: [
    [
        'html',
        {
            open: 'never', // Don't auto-open HTML report
        }
    ],
    [
        'allure-playwright',
        {
            detail: true,
            suiteTitle: true,
            environmentInfo: {
                name: 'TEST',
                appName: "CURA Healthcare Service",
                Release: 'Release 1.0',
                node_version: process.version
            },
        },
    ],
],
```

**Screenshot**
1. Config options -> `use` -> `screenshot`
2. At test scope level


