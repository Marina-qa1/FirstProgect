import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const URL = 'https://realworld.qa.guru/';
// Выносим селекторы в отдельные константы
//main
const SIGNUP_LINK_TEXT = 'Sign up';
//register
const YOUR_NAME_INPUT_TEXT = 'Your Name';
const EMAIL_INPUT_TEXT = 'Email';
const PASSWORD_INPUT_TEXT = 'Password';
const SIGNUP_BUTTON_TEXT = 'Sign up';

//const nameInput = ('textbox', { name: 'Your Name' });
const fillRegistrationForm = async (page, name, email, password) => {
	await page.getByRole('link', { name: SIGNUP_LINK_TEXT }).click();
	await page.getByRole('textbox', { name: YOUR_NAME_INPUT_TEXT });
	await page.getByRole('textbox', { name: YOUR_NAME_INPUT_TEXT }).fill(name);
	await page.getByRole('textbox', { name: YOUR_NAME_INPUT_TEXT }).press('Tab');
	await page.getByRole('textbox', { name: EMAIL_INPUT_TEXT }).fill(email);
	await page.getByRole('textbox', { name: EMAIL_INPUT_TEXT }).press('Tab');
	await page.getByRole('textbox', { name: PASSWORD_INPUT_TEXT }).fill(password);
	await page.getByRole('button', { name: SIGNUP_BUTTON_TEXT }).click();
};

test.describe('Регистрация', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(URL);
	});

	test('Пользователь может зарегистрироваться с навигацией через клавиатуру', async ({
		page,
	}) => {
		const name = faker.person.fullName();
		const email = faker.internet.email();
		const password = faker.internet.password();

		await fillRegistrationForm(page, name, email, password);
		await expect(page.getByText(name)).toBeVisible();
		await expect(page.getByRole('navigation')).toContainText(name);
	});
});