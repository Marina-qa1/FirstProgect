import { test } from '@playwright/test';

export class ArticlePage{
    constructor(page){
    this.page = page;

 this.newArticleTitle =  page.getByRole('textbox', { name: 'Article Title' });
 this.shortTextInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
 this.descriptionInput = page.getByRole('textbox', { name: 'Write your article (in' });
 this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
 this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });


// Редактирование статьи
this.editNewArticle = page.getByRole('link', { name: 'Edit Article' }).first();
this.editArticleTitle = page.getByRole('textbox', { name: 'Article Title' });
this.editArticleText = page.getByRole('textbox', { name: 'What\'s this article about?' });
this.editArticleDiscription = page.getByRole('textbox', { name: 'Write your article (in' });
this.editArticleTags = page.getByRole('textbox', { name: 'Enter tags' });
this.editPublishArticleButton = page.getByRole('button', { name: 'Update Article' });

 //this.buttonEdit = page.getByRole('button', { name: 'Publish Article' });
//  this.buttonEdit = page.getByRole('link', { name: 'Edit Article' });
//  this.buttonUpdate = page.getByRole('button', { name: 'Update Article' });

this.deleteArticleButton = page.getByRole('button', { name: 'Delete Article' }).first();
this.editArticleButton = page.getByRole('button', { name: 'Edit Article' }).first();
this.commentTextbox = page.getByRole('textbox', { name: 'Write a comment...' });
this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
this.deleteCommentButton = page.locator('.btn.btn-sm.btn-outline-secondary.pull-xs-right');

this.navigationLogin = page.getByRole('navigation').getByText('Marina');
this.profile = page.getByRole('link', { name: ' Profile' });
this.selectArticle = page.getByRole('link', { name: 'Title text Marina me and you' });

this.firstArticle = page.locator('.article-preview').first();
this.deleteButton = page.getByRole('button', { name: 'Delete Article' })
                               .or(page.locator('.btn-outline-danger'))
                               .first();
}


//   async gotoArticle()
//     {
//      return test.step('Переход по кнопке Новая статья', async(step) => {
//      await this.newArticle.click();
//     step.attach()
// })
// };
async actionNewArticle(newArticle1) {
        const { title, shortText, description, tags} = newArticle1;
            
            await this.newArticleTitle.click();
            await this.newArticleTitle.fill(title);
            await this.shortTextInput.click();
            await this.shortTextInput.fill(shortText);
            await this.descriptionInput.click(); 
            await this.descriptionInput.fill(description); 
            await this.tagsInput.click();
            await this.tagsInput.fill(tags);
            await this.publishArticleButton.click();
       
}


    // Редактируем статью
    // async gotoEditArticle() {
    //     await this.editPublishArticleButton.click();
    // };
        async gotoEdit() {

		await this.editNewArticle.click();
	}


 async editArticle (editArticleText) {
        const { title, annotation, content, tags} = editArticleText;

        await this.editArticleTitle.click();
        await this.editArticleTitle.fill(title);
        await this.editArticleText.click();
        await this.editArticleText.fill(annotation);
        await this.editArticleDiscription.click();
        await this.editArticleDiscription.fill(content);
        await this.editArticleTags.click();
        await this.editArticleTags.fill(tags);
        await this.editPublishArticleButton.click();

    }


    async getFirstArticle() {
        await this.firstArticle.waitFor({ state: 'visible' });
        return {
            title: await this.firstArticle.locator('h1').textContent(),
            description: await this.firstArticle.locator('p').textContent(),
            element: this.firstArticle
        };
    }

        // Кликнуть на первую статью
    // async clickFirstArticle() {
    //     await this.firstArticle.click();
    // }
    async clickFirstArticle() {
    console.log('URL перед кликом на статью:', await this.page.url());
    
    // Проверим что статья есть и видима
    const isArticleVisible = await this.firstArticle.isVisible();
    console.log('Первая статья видима:', isArticleVisible);
    
    if (!isArticleVisible) {
        await this.page.screenshot({ path: 'debug-no-articles.png' });
        throw new Error('Статья не видима для клика');
    }
    
    // Получим заголовок статьи для отладки
    const articleTitle = await this.firstArticle.locator('h1').textContent();
    console.log('Кликаем на статью:', articleTitle);
    
    await this.firstArticle.click();
    
    // Ждем загрузки (может быть AJAX)
    await this.page.waitForLoadState('networkidle');
    
    console.log('URL после клика на статью:', await this.page.url());
    
    // Если не перешли на страницу статьи, попробуем другой подход
    if (!(await this.page.url()).includes('/article')) {
        console.log('Не перешли на страницу статьи, пробуем другой локатор...');
        
        // Попробуем кликнуть на ссылку "Read more" внутри статьи
        const readMoreLink = this.firstArticle.locator('a').filter({ hasText: /read more|читать/i });
        if (await readMoreLink.isVisible()) {
            await readMoreLink.click();
            await this.page.waitForLoadState('networkidle');
        }
    }
}

   async transferProfile() {

		await this.navigationLogin.click();
        await this.profile.click();
	} 

    async writeComment(commentText) {
        const {newCommentText} = commentText;
        await this.commentTextbox.click();
        await this.commentTextbox.fill(newCommentText);
        await this.postCommentButton.click();
    }

        async getArticlesCount() {
        // Убедитесь что this.page определен
        if (!this.page) {
            throw new Error('Page is not defined in ArticlePage');
        }
        return await this.page.locator('.article-preview').count();
    }

    async deleteArticle(){
        await this.deleteButton.click();
    }

}
  

