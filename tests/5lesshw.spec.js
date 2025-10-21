import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {MainPage, RegisterPage, LoginPage} from '../src/pages/index';



const URL = 'https://realworld.qa.guru/';

 test.describe('Функциональные', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
});

test('Открыть первый тег Реклама', async ({
    page,}) => {

		const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);
       
      const firstTag = page.locator('.tag-pill', { hasText: 'реклама' }).first();
  

		// todo переделать ассерт
 await expect(firstTag).toContainText('реклама');
		
	});

test('Поставь лайк первому пользователю', async ({
    page,}) =>{

		const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);

        const beLike = page.locator('.counter', {hasText: '0'}).first();

await expect(beLike).toBeEnabled();

    });

    test('Пользователь может переключить страницу', async({page})=>{

        const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);
        const nextPage = page.locator('a.page-link[aria-label="Next page"]');


        await expect(nextPage).toHaveText('Page 2');
    });

    
});