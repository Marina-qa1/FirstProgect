export class GlobalFeedPage {
	constructor(page) {
		// техническое описание страницы
		this.signupLink = page.getByRole('link', { name: 'Sign up' });
		this.loginLink = page.getByRole('link', { name: 'Login' });
      //  this.buttonGlobalFeed = page.getByRole('button', { name: 'Global Feed' });
        this.navigationLogin = page.getByRole('navigation').getByText('Marina');
        this.profile = page.getByRole('link', { name: ' Profile' });
        this.selectArticle = page.getByRole('link', { name: 'Title text Marina me and you' });

        this.editNewArticle = page.getByRole('link', { name: 'Edit Article' }).first();
        this.editTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.editShortText = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.editDiscription = page.getByRole('textbox', { name: 'Write your article (in' });
        this.editTag = page.getByRole('textbox', { name: 'Enter tags' });
        this.ubdateButton = page.getByRole('button', { name: 'Update Article' });
        this.commentButton = page.getByRole('button', { name: 'Post Comment' });

        this.deleteButton = page.getByRole('button', { name: ' Delete Article' }).first();
//     page.once('dialog', dialog => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     dialog.dismiss().catch(() => {});
//   });
        //this.notAvailable = page.getByText('Articles not available.');
        this.notAvailable = page.getByRole('button', { name: 'Your Feed' });

	}
	// бизнесовые действия со страницой
	async gotoRegister() {
		await this.signupLink.click();
	}

   /* 
   async gotoGlobalFeed() {

		await this.buttonGlobalFeed.click();
	} 
        */

   async transferProfile() {

		await this.navigationLogin.click();
        await this.profile.click();
	} 

   async choiceArticle() {

		await this.selectArticle.click();
	}
   
    async gotoEdit() {

		await this.editNewArticle.click();
	}

    async editArticle(article){
  const{title, shortText, discription, tags} = article;            
//await this.choiceArticle.click();
//await this.editNewArticle.click();
await this.editTitle.click();
await this.editTitle.fill(title);
await this.editShortText.click();
await this.editShortText.fill(shortText);
await this.editDiscription.click();
await this.editDiscription.fill(discription);
await this.editTag.click();
await this.editTag.fill(tags);
await this.ubdateButton.click();

    }


    async deleteArticle(){
        await this.deleteButton.click();
    }
}