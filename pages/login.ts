import { test, expect, Locator, Page } from '@playwright/test';

export class Login {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('/');
    }
    async typeUsername(username) {
        await this.getUsername().type(username);
    }
    async clearUsername() {
        await this.getUsername().clear();
    }
    async typePassword(password) {
        await this.getPassword().type(password);
    }
    getPassword() {
        return this.page.getByLabel('Password');
    }
    getPasswordValidation() {
        return this.page.locator('#password-helper-text');
    }
    async checkRememberMe() {
        await this.page.getByRole('checkbox', { name: 'remember' }).click();
    }
    async clickSignIn() {
        await this.getSignInButton().click();
    }
    getSidenavUsername() {
        return this.page.getByTestId('sidenav-username'); 
    }
    getUsername() {
        return this.page.getByLabel('Username');
    }
    getUsernameValidation() {
        return this.page.locator('#username-helper-text');
    }
    getSignInButton() {
        return this.page.getByTestId('signin-submit');
    }
    async clickMain() {
        await this.page.getByRole('main').click();
    }
    getSignInAlert() {
        return this.page.getByTestId('signin-error');
    }
    async clickSignUpButton() {
        await this.page.getByTestId('signup').click();
    }
    getSignUpTitle() {
        return this.page.getByTestId('signup-title');
    }
}