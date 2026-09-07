import { test, expect } from '@playwright/test'

test.describe('Login Functionlity', { annotation: { type: 'Story', description: 'JIRA-2345 Login functionality' }, tag: '@regression' }, () => {

    test.beforeEach('Go to login page', async ({ page }) => {
        // Launch URL
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle('CURA Healthcare Service');
        await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');

        // Click on the Make Appointment
        await page.getByRole('link', { name: "Make Appointment" }).click();
        await expect(page.getByText('Please login to make appointment.')).toBeVisible();
    })

    test('should login successfully', { tag: '@smoke' }, async ({ page }) => {

        /**
        * Capability: Auto-waiting
        * @scenarios
        * 1. Just location element - Lazy
        * 2. Invalid locator on action method
        * 3. Valid locator but invalid action
        * 4. Invalid locator on expect method
        */

        // let element = page.locator('#txt-usernames');
        // element.fill('John Doe');

        // let element = page.locator('#txt-username');
        // element.check()

        // Login
        await page.locator('#txt-username').fill('John Doe');
        await page.locator('#txt-password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        // Assert the text
        await expect(page.locator('h5')).toContainText('Make Appointment');
    })

    test('should prevent login using the incorrect login data', async ({ page }) => {
        // Unsuccessful Login
        await page.locator('#txt-username').fill('John Does');
        await page.locator('#txt-password').fill('ThisIsNotAPasswordsS');
        await page.getByRole('button', { name: 'Login' }).click();

        // Assert the error message
        await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
    })

});