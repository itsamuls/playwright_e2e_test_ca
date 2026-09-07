import { test, expect } from '@playwright/test'

test.beforeAll('BEFORE ALL HOOKS', () => {
    console.log('Before All file scope')
});

test.afterAll('AFTER ALL HOOKS', () => {
    console.log('After All file scope')

});

test.beforeEach('BEFORE EACH HOOKS', () => {
    console.log('Before Each file scope')

});

test.afterEach('AFTER EACH HOOKS', () => {
    console.log('After Each file scope')

});

test('Test-1', async ({ page }) => {
    console.log('Inside the test 1');
})

test('Test-2', async ({ page }) => {
    console.log('Inside the test 2');
})

test.describe('Describe 1', () => {

    test('Test-3', async ({ page }) => {
        console.log('Inside Describe 1 test 3');
    })

    test('Test-4', async ({ page }) => {
        console.log('Inside Describe 1 test 4');
    })
})