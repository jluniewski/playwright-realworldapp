import { test, expect, Locator, Page } from '@playwright/test';
import { General } from '../../pages/general';
import { Notifications } from '../../pages/notifications';

const users = require('../../support/users.json');
const alerts = require('../../support/alerts.json');
const notificationsList = require('../../support/notifications.json');

let page: Page;

test.beforeEach(async ({ browser }) => {
    await General.seedDb();
    page = await browser.newPage();
    await page.goto('/');
    await page.waitForSelector('main');
});

test.describe('Notifications page', async () => {
    test('shows all notifications on the list', async () => {
        const notifications = new Notifications(page);
        await notifications.loginUsernamePassword(
            users.userEdgar.username,
            users.userEdgar.password
        );

        await notificationsList.list.forEach(async (singleNotification) => {
            await expect(await notifications.getAllNotifications()).toContain(singleNotification);
        });
    });
    test('can be opened from bell icon', async () => {
        const notifications = new Notifications(page);
        await notifications.loginUsernamePassword(
            users.userEdgar.username,
            users.userEdgar.password
        );
        await notifications.clickBellIcon();

        await expect(await notifications.getBellIcon()).toContainText(
            notificationsList.list.length.toString()
        );
        await notificationsList.list.forEach(async (singleNotification) => {
            await expect(await notifications.getAllNotifications()).toContain(singleNotification);
        });
    });
    test('allows to dismiss a notification', async () => {
        const notifications = new Notifications(page);
        await notifications.loginUsernamePassword(
            users.userEdgar.username,
            users.userEdgar.password
        );
        await notifications.dismiss(notificationsList.list[0]);

        await expect(await notifications.getAllNotifications()).not.toContain(
            notificationsList.list[0]
        );
    });
    test('shows message for no notifications', async () => {
        const notifications = new Notifications(page);
        await notifications.loginUsernamePassword(
            users.userEdgar.username,
            users.userEdgar.password
        );
        await notifications.dismissAll(notificationsList);

        await expect(await notifications.getMain()).toContainText(alerts.noNotifications);
    });
});
