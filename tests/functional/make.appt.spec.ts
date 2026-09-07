import { test, expect } from '@playwright/test';

test.describe('Make an appointment', () => {

    test.beforeEach('Login with valid credentials', async ({ page }) => {
        // Launch URL
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle('CURA Healthcare Service');
        await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');

        // Click on the Make Appointment
        await page.getByRole('link', { name: "Make Appointment" }).click();
        await expect(page.getByText('Please login to make appointment.')).toBeVisible();
    });

    test('Should make an appointment with non-default values', async ({ page }) => {
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