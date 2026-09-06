import { test, expect } from '@playwright/test'

test('should login successfully', async ({ page }) => {
    // Launch URL
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    // 2. Click on the Make Appointment
    await page.getByRole('link', { name: "Make Appointment" }).click();
    await expect(page.getByText('Please login to make appointment.')).toBeVisible();

    // 3 Login
    await page.locator('#txt-username').fill('John Doe');
    await page.locator('#txt-password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert the text
    await expect(page.locator('h2')).toContainText('Make Appointment');
});