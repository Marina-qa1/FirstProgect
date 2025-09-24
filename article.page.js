export class ArticlePage{
    constructor(page){

 this.newArticle = page.getByRole('link', { name: ' New Article' });
 this.titleInput =  page.getByRole('textbox', { name: 'Article Title' });
 this.shortTextInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
 this.discriptionInput = page.getByRole('textbox', { name: 'Write your article (in' });
 this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
 this.publishArticle = page.getByRole('button', { name: 'Publish Article' });

 this.buttonEdit = page.getByRole('button', { name: 'Publish Article' });
 this.buttonUpdate = page.getByRole('button', { name: 'Update Article' });


}



  async gotoArticle()
    {
    //  return test.step('Переход по кнопке Новая статья', async(step) => {
     await this.newArticle.click();
   //  step.attach()
//})
};

async createArticle(article)
    {
            return test.step(` Создать статью ${article.title} с название ${article.shortText}, описанием ${article.discription} и тегом ${article.tags}`, 
              async(step) => {

					step.attach('Заполнение статьи'), {
					ReportBody: "",
					contentType:  `${article.title} с название ${article.shortText} , описанием ${article.discription} и тегом ${article.tags} `,

          }
  const{title, shortText, discription, tags} = article;            
await this.newArticle.click();
await this.titleInput.click();
await this.titleInput.fill(title);
await this.shortTextInput.click();
await this.shortTextInput.fill(this.shortText);
await this.discriptionInput.click();
await this.discriptionInput.fill(this.discription);
await this.tagsInput.click();
await this.tagsInput.fill(tags);
await this.publishArticle.click();
 
	});
}

  async editArticle()
    {
   //   return test.step('Редактирование статьи', async(step) => {
     await this.buttonUpdate.click();
    // step.attach()

 // })
};



}
  

