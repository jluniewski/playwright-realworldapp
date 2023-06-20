import { Page } from '@playwright/test';

export class Notifications {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async loginUsernamePassword(username, password) {
        await this.page.goto('/signin');
        await this.page.getByLabel('Username').type(username);
        await this.page.getByLabel('Password').type(password);
        await this.page.getByTestId('signin-submit').click();
        await this.page.waitForSelector('header');
        await this.page.goto('/notifications');
        await this.page.waitForSelector('header');
    }

    async dismiss(notification) {
        await this.page
            .locator('li[data-test*="notification-list-item"]', {
                has: this.page.getByText(notification),
            })
            .getByRole('button', { name: 'Dismiss' })
            .first()
            .click();
    }
    async dismissAll(notificationArray) {
        await notificationArray.list.forEach(async (notification) => {
            await this.dismiss(notification);
        });
    }

    async getAllNotifications() {
        return await this.page.getByTestId('notifications-list').textContent();
    }

    async getBellIcon() {
        return await this.page.getByTestId('nav-top-notifications-link');
    }

    async clickBellIcon() {
        await (await this.getBellIcon()).click();
    }

    async getMain() {
        return await this.page.getByRole('main');
    }
}
