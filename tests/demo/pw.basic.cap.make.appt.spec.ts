import { test, expect } from '@playwright/test';

test.describe('Make an appointment', { annotation: { type: 'Story', description: 'JIRA-1234 Make appoitment feature' } }, () => {

    test.beforeEach('Login with valid credentials', async ({ page }, testInfo) => {
        // Launch URL
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle('CURA Healthcare Service');
        await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');

        // Click on the Make Appointment
        await page.getByRole('link', { name: "Make Appointment" }).click();
        await expect(page.getByText('Please login to make appointment.')).toBeVisible();

        // Successful Login
        await page.locator('#txt-username').fill('John Doe');
        await page.locator('#txt-password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        /**
         * Add custom screenshot at test  scope level
         * @TODO: add this as the helper function
         */

        let fullPageScreenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach(
            'Login Page',
            {
                body: fullPageScreenshot,
                contentType: 'image/png'
            }
        )

        // Assert the text
        await expect(page.locator('h2')).toContainText('Make Appointment');
    });

    test('Should make an appointment with non-default values', { annotation: { type: 'Bug', description: 'Defect 1234, does not work  in firefox' }, tag: '@smoke' }, async ({ page, browserName }) => {

        // Skip this test for firefox
        test.skip(browserName === 'firefox', 'Open bug id JIRA-1234')

        // Dropdown 
        await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

        // CHeckbox
        await page.getByText('Apply for hospital readmission').click();

        // Radiobutton
        await page.getByRole('radio', { name: 'Medicaid' }).check();

        // Date input
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).fill('05/10/2027');
        await page.getByRole('textbox', { name: 'Visit Date (Required)' }).press('Enter');

        // Multiline comment input box 
        await page.getByRole('textbox', { name: 'Comment' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).fill('This is multi-line comment.');

        // Button
        await page.getByRole('button', { name: 'Book Appointment' }).click();

        // Assertions
        await expect(page.locator('h2')).toContainText('Appointment Confirmation');
        await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
    });

})