import { test, expect } from '@playwright/test'

test('should load homepage with correct title', async ({ page }) => {
    // 1. Go to the home page
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    // 2. Assert if the title is correct
    await expect(page).toHaveTitle('CURA Healthcare Service');

    // 3. Assert header text
    await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');
});

test('should perform some test', { tag: '@smoke' }, async ({ page }, testInfo) => {
    // steps
    await page.locator("//h1").click();
});

test.only('should demo locators', async ({ page }) => {

    // ✅ `page.getBy*()` and `page.locator()` methods returns the `locator` object
    // ✅ The above methods not to be `awaited`
    // ✅ The type of locator is an `object`
    // ✅ Locators are LAZY until an action is fired on them


    // 1. Launch URL
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    // 2. Click on the Make Appointment
    let makeApptBtn = page.getByRole('link', { name: "invalid locator" });
    // let makeApptBtn = page.getByRole('link', { name: "Make Appointment" });
    await makeApptBtn.click();
    // await expect(page.getByText('Please login to make appointment.')).toBeVisible();

    // 3 Login
    // await page.locator('#txt-username').fill('John Doe');
    // await page.locator('#txt-password').fill('ThisIsNotAPassword');
    // await page.getByRole('button', { name: 'Login' }).click();

    // // Assert the text
    // await expect(page.locator('h2')).toContainText('Make Appointment');
})






