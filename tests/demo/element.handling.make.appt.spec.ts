import { test, expect } from '@playwright/test';

test.describe('Make an appointment', () => {
    test.beforeEach('Login with valid credentials', async ({ page }) => {
        // Launch URL
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle('CURA Healthcare Service');
        await expect(page.locator('h1')).toHaveText('CURA Healthcare Service');

        /**
        * ELEMENT: Button, Link
        *
        * @actions
        * 1. Click
        * 2. Press
        * 3. Double click
        * 4. Right click
        * 5. Hover if link
        * 6.[Optional] timeout if slow
        */

        // Click on the Make Appointment        
        // await page.getByRole('link', { name: "Make Appointment" }).click();
        // await page.getByRole('link', { name: "Make Appointment" }).press('Enter');
        // await page.getByRole('link', { name: "Make Appointment" }).dblclick();
        // await page.getByRole('link', { name: "Make Appointment" }).click({ button: 'right' });
        // await page.getByRole('link', { name: "Make Appointment" }).hover();
        await page.getByRole('link', { name: "Make Appointment" }).click({ timeout: 10_000 });

        await expect(page.getByText('Please login to make appointment.')).toBeVisible();

        /**
        * ELEMENT: Text Box
        *
        * @actions
        * 1. Clear/click before filling
        * 2. Fill
        * 3. pressSequentially (Slow typing)
        */

        // Successful Login
        // await page.locator('#txt-username').fill('John Doe');

        // await page.locator('#txt-username').clear();
        // await page.locator('#txt-username').fill('John Doe');

        await page.locator('#txt-username').pressSequentially('John Doe', { delay: 300 });

        await page.locator('#txt-password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        // Assert the text
        await expect(page.locator('h2')).toContainText('Make Appointment');
    })

    test('Should make an appointment with non-default values', async ({ page }) => {

        /**
        * ELEMENT: Dropdown
        *
        * @actions
        * 1. Assert default option
        * 2. Select by:
        *    - Label
        *    - Index
        * 3. Assert the count
        * 4. Get all dropdown values
        * @notes
        * - Selenium - Select class and 3 selectBy* methods
        * - WebdriverIO - 3 selectBy* methods
        */

        // Dropdown 
        // await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');

        // 1. Assert default option
        await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center')

        // Select by: - Label
        await page.getByLabel('Facility').selectOption({ label: 'Seoul CURA Healthcare Center' });
        // Select by: - Index
        await page.getByLabel('Facility').selectOption({ index: 0 });

        // Assert the count
        await expect(page.getByLabel('Facility').locator('option')).toHaveCount(3);

        // Get all dropdown values
        let listOfOptionsElems = await page.getByLabel('Facility').all();

        //for...of loop
        let listOfOptions = [];

        for (let elem of listOfOptionsElems) {
            let elemText = await elem.textContent();
            if (elemText)
                listOfOptions.push(elemText);
        }
        console.log(`List of dropdown options: ${listOfOptions}`);

        /**
        * ELEMENT: Checkbox/Radio button
        *
        * @actions
        * 1. Assert the default option - to be checked/unchecked
        * 2. Check/uncheck
        * 
        * @notes
        * - Radio button - Allows to select only one option
        * - Checkbox - Allows for multi-entry
        */

        // Checkbox
        // await page.getByText('Apply for hospital readmission').click();
        await page.getByText('Apply for hospital readmission').check();
        await page.getByText('Apply for hospital readmission').uncheck();

        // Radiobutton
        // Assert the default option
        await expect(page.getByRole('radio', { name: 'Medicare' })).toBeChecked();
        await page.getByRole('radio', { name: 'Medicaid' }).check();
        await expect(page.getByRole('radio', { name: 'Medicare' })).not.toBeChecked();

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