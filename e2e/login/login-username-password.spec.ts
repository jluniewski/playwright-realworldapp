import { test, expect, Locator, Page } from '@playwright/test';
import { Login } from '../../pages/login';
import { General } from '../../pages/general';

const users = require('../../support/users.json');
const alerts = require('../../support/alerts.json');
let page: Page;

let incorrectUsername = 'test';
let incorrectPassword = 'test';
let shortPassword = 'abc';

test.beforeEach(async ({ browser }) => {
    General.seedDb();
    page = await browser.newPage();
    await page.goto('/');
});

test.describe('Login page', () => {
    test('allows to login via username and password', async () => {
        const login = new Login(page);
        await login.typeUsername(users.userEdgar.username);
        await login.typePassword(users.userEdgar.password);
        await login.clickSignIn();

        await expect(login.getSidenavUsername()).toHaveText(`@${users.userEdgar.username}`);
    });
    test('validates empty username and short password', async () => {
        const login = new Login(page);
        await login.typePassword(shortPassword);
        await login.clearUsername();

        await expect(login.getUsernameValidation()).toHaveText(alerts.emptyUsername);
        await expect(login.getPasswordValidation()).toHaveText(alerts.shortPassword);
        await expect(login.getSignInButton()).toBeDisabled;
    });
    test('validates incorrect username or password', async () => {
        const login = new Login(page);
        await login.typeUsername(incorrectUsername);
        await login.typePassword(incorrectPassword);
        await login.clickSignIn();

        await expect(login.getSignInAlert()).toContainText(alerts.invalidUsernamePassword);
    });
    test('allows user to go to Sign Up page', async () => {
        const login = new Login(page);
        await login.clickSignUpButton();
        
        await expect(login.getSignUpTitle()).toBeVisible;
    })
});
