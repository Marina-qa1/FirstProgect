import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import {MainPage, RegisterPage, LoginPage, GlobalFeedPage, SignInPage, ArticlePage, YourFeedPage} from '../src/pages/index';


const URL = 'https://realworld.qa.guru/';


test.describe('Авторизация', () => {
  test.beforeEach(async ({ page }) => {
    const authUser = { 
    email: 'marina1@ya.ru', 
    password: 'qwerty' };
  const mainPage = new MainPage(page);
  const signInPage = new SignInPage(page);

  await page.goto(URL);
  await mainPage.gotoLogin();
  await signInPage.signIn(authUser);
  
});

        test('Пользователь может создать статью', async({page})=>
            {

        const yourFeedpage = new YourFeedPage(page);
        const articlePage = new ArticlePage(page);

        const newArticle1 = {
            title: `Тестовая статья ${Date.now()}`,
            shortText: 'Краткое описание статьи',
            description: 'Полное описание тестовой статьи',
            tags: 'test, automation'
        };

        await yourFeedpage.createArticle();
        await articlePage.actionNewArticle(newArticle1);

        await expect(yourFeedpage.articleFirst).toContainText(newArticle1.title);
});

   test('Пользователь может отредактировать уже созданную статью', async({page})=>
            {
    const newArticle = {
        title: faker.lorem.words(5),
        shortText: faker.lorem.words(5),
        description: faker.lorem.text(),
        tags: faker.book.genre(),
    };
        const editArticleText = {
        title: faker.lorem.words(5),
        annotation: faker.lorem.words(5),
        content: faker.lorem.text(),
        tags: faker.book.genre(),
        };       

        const yourFeedpage = new YourFeedPage(page);
        const articlePage = new ArticlePage(page);
        const globalfeedPage = new GlobalFeedPage(page);

          // Создаем новую статью
        await yourFeedpage.createArticle();
        await articlePage.actionNewArticle(newArticle);
        

          // Редактируем созданную статью
        await globalfeedPage.gotoEdit();
        await articlePage.editArticle(editArticleText);

        await expect(yourFeedpage.articleFirst).toContainText(editArticleText.title);

  });

  test('Пользователь может оставить комментарий', async ({page}) => {
        const newArticle = {
        title: faker.lorem.words(5),
        shortText: faker.lorem.words(5),
        description: faker.lorem.text(),
        tags: faker.book.genre(),
    };
        const yourFeedpage = new YourFeedPage(page);
        const articlePage = new ArticlePage(page);
        const commentText = {newCommentText: faker.lorem.words(8)};

          // Создаем новую статью
        await yourFeedpage.createArticle();
        await articlePage.actionNewArticle(newArticle);

     // Пишем комментарий
     await articlePage.writeComment(commentText);

     await expect(yourFeedpage.articleCommentText).toContainText(commentText.newCommentText);

});


    test('Пользователь может удалить статью', async ({page}) => {

        const newArticle = {
        title: `Тест удаления ${Date.now()}`, // Уникальный заголовок
        shortText: faker.lorem.words(5),
        description: faker.lorem.text(),
        tags: faker.book.genre(),
    };
  const yourFeedpage = new YourFeedPage(page);
  const articlePage = new ArticlePage(page);
  const globalfeedPage = new GlobalFeedPage(page);


  
    // Создаем новую статью
    await yourFeedpage.createArticle();
    await articlePage.actionNewArticle(newArticle);


// Проверьте что мы на странице статьи
await expect(page).toHaveURL(/.*\/article/);
await expect(page.locator('h1')).toContainText(newArticle.title);
console.log('Статья создана:', newArticle.title);

           // Переходим в профиль чтобы увидеть статью
    await globalfeedPage.transferProfile();
    await expect(page).toHaveURL(/.*\/profile/);
    console.log('Перешли в профиль');

        // Проверяем что статьи есть в профиле
    const articlesCount = await articlePage.getArticlesCount();
    console.log('Статей в профиле:', articlesCount);
    expect(articlesCount).toBeGreaterThan(0);

    // Открываем статью
    await articlePage.clickFirstArticle();
    await expect(page).toHaveURL(/.*\/article/);
    console.log('Статья открыта');

        // Проверяем что кнопка удаления видна
    await expect(articlePage.deleteButton).toBeVisible({ timeout: 10000 });
    console.log('Кнопка Delete видна');

    // Удаляем статью
    await articlePage.deleteArticle(page); 

    // Проверяем что вернулись на главную
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    console.log('Удаление завершено успешно');
});

test('Пользователь может открыть первый тег Реклама', async ({
    page,}) => {

		const mainPage = new MainPage(page);
		const registerPage = new RegisterPage(page);
       
      const firstTag = page.locator('.tag-pill', { hasText: 'реклама' }).first();
  
 await expect(firstTag).toContainText('реклама');
		
	});

});
    
	

    
