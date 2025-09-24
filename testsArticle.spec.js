import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {MainPage, RegisterPage, LoginPage, GlobalFeedPage} from '../src/pages/index';
import { ArticlePage } from '../src/pages/article.page';



const URL = 'https://realworld.qa.guru/';

 test.describe('Функциональные тесты ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);

});

        test('Пользователь может открыть драфт новой статьи', async({page})=>
            {
		const user = {

            name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

 		const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);
        const articlePage = new ArticlePage(page);

		await mainPage.gotoRegister();
		await registerPage.register(user);
	    await articlePage.gotoArticle();

	
    await expect(articlePage.newArticle).toBeVisible();

	});

        test('Пользователь может создать статью', async({page})=>
            {
		const user = {

            name: faker.person.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

 		const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);
        const articlePage = new ArticlePage(page);

		await mainPage.gotoRegister();
		await registerPage.register(user);
	    await articlePage.gotoArticle();
        await articlePage.createArticle(article);

	
    await expect(articlePage.newArticle).toBeVisible();


    const article = {
        title: faker.lorem.word(5),
        shortText: faker.lorem.sentence(2),
        discription: faker.lorem.paragraph(2),
        tags: faker.lorem.words(1),
    };

    await articlePage.createArticle(article);
      console.log('Статья создана');


await expect(articlePage.buttonEdit).toBeVisible();

  
});

   test('Пользователь может отредактировать уже созданную статью', async({page})=>
            {
		const user = {
			email: 'marina1@ya.ru',
			password: 'qwerty',
		};

 		const mainPage = new MainPage(page);
		const loginPage = new LoginPage(page);
        const articlePage = new ArticlePage(page);
        const globalfeedPage = new GlobalFeedPage(page);
        
    // Сначала переходим на страницу логина
    await mainPage.gotoLogin();
    
    // Затем логинимся
    await loginPage.login(user);
    
	//	 await loginPage.login(user.email, user.password);

    // Переходим на страницу GlobalFeed
   // await globalfeedPage.gotoGlobalFeed();

   //Переходим в профиль
   await globalfeedPage.transferProfile();

    // Выбираем статью
    await globalfeedPage.choiceArticle();

    // Кликаем на кнопку Edit

    await globalfeedPage.gotoEdit();



    const article = {
        title: ('Title text for Marina2'),
        shortText: ('you and me'),
        discription: ('about me !'),
        tags: ('my'),
    };

    await globalfeedPage.editArticle(article);
      console.log('Статья отредактирована');



await expect(globalfeedPage.commentButton).toBeVisible();

  });


     test.only('Пользователь может удалить статью', async({page})=>
            {
		const user = {
			email: 'marina1@ya.ru',
			password: 'qwerty',
		};

 		const mainPage = new MainPage(page);
		const loginPage = new LoginPage(page);
        const articlePage = new ArticlePage(page);
        const globalfeedPage = new GlobalFeedPage(page);
        
    // Сначала переходим на страницу логина
    await mainPage.gotoLogin();
    
    // Затем логинимся
    await loginPage.login(user);

   //Переходим в профиль
   await globalfeedPage.transferProfile();

    // Выбираем статью
    await globalfeedPage.choiceArticle();

    await expect(globalfeedPage.deleteButton).toBeVisible();
    console.log('нашли кнопку Delete');

    // Кликаем на кнопку Delete
   await globalfeedPage.deleteArticle();



await expect(globalfeedPage.notAvailable).toBeVisible();

  });

});
    
	

    
