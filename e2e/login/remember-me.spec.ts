import { test, expect, Locator, Page } from '@playwright/test';
import { Login } from '../../pages/login';
import { General } from '../../pages/general';

const users = require('../../support/users.json');

let page: Page;

test.beforeEach(async ({ browser }) => {
    General.seedDb();
    page = await browser.newPage();
    await page.goto('/');
});

test.describe('Remember Me option', () => {
    test('remembers username and password', async () => {
        const login = new Login(page);
        await login.typeUsername(users.userEdgar.username);
        await login.typePassword(users.userEdgar.password);
        await login.clickSignIn();
        await login.logout();

        //this test will fail, app doesn't have this functionality
        await expect(login.getUsername()).toHaveValue(users.userEdgar.username);
        await expect(login.getPassword()).toHaveValue(users.userEdgar.password);
    })
})