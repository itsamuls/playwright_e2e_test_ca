import { test, expect } from '@playwright/test'

test.describe('Checkout flow', () => {

    test.beforeEach('Login with valid credentials', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
        await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Products')).toBeVisible();
    });

    test('Checkout a product', async ({ page }) => {
        await page.locator('.inventory_item').nth(0).getByRole('button', { name: 'Add to cart' }).click();
        await page.locator('.shopping_cart_link').click();
        await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
        await page.getByRole('button', { name: 'Checkout' }).click();
        await expect(page.getByText('Checkout: Your Information')).toBeVisible();
    })
});