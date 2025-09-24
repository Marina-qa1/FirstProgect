export class LoginPage{
    constructor(page){

        //техническое оеписание страницы       

// todo нейминг
this.emailInput = page.getByRole('textbox', { name: 'Email'});
this.passwordInput = page.getByRole('textbox', { name: 'Password' });
this.loginButton = page.getByRole('button', { name: 'Login' });

            
    }


    async login(user){
        const {email, password} = user;
        await this.emailInput.click();
        await this.emailInput.fill(email);


        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();

/*
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('tata@ya.ru');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('qwerty');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByRole('button', { name: 'Login' }).click();
*/

    }

};