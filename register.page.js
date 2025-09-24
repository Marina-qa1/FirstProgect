export class RegisterPage{
    constructor(page){

        //техническое оеписание страницы       

// todo нейминг
this.nameInput =  page.getByRole('textbox', { name: 'Your name'});
this.emailInput = page.getByRole('textbox', { name: 'Email'});
this.passwordInput = page.getByRole('textbox', { name: 'Password' });
this.signupButton = page.getByRole('button', { name: 'Sign up'});
this.emailErrorText = page.getByText('Email already exists.. try logging in');
            
    }
// бизнесовые действия со страницей
    async register(user){
        const {name, email, password} = user;
        await this.nameInput.click();
        await this.nameInput.fill(name);
        await this.emailInput.click();
        //todo хардкод email
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.signupButton.click();


    }

};

