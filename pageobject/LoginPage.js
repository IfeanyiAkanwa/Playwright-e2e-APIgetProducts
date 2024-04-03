import {expect} from '@playwright/test'
class LoginPage{

    constructor(page){
        this.page = page
        this.loginButton = page.locator(".login")
        this.loginDialogHeader = page.locator("p[text_key='LOGIN__WELCOME']")
        this.userName = page.getByPlaceholder("Username")
        this.password = page.getByPlaceholder("password")
        this.loginDialogBtn = page.locator("button[text_key='LOGIN__LOG_IN']")
        this.userProfileName = page.locator(".user")


    }
async navigateToLanding(){
    await this.page.goto("https://rolletto.cc/en")
}

async LoginDialog(username, password){
    await this.loginButton.click();
    await expect(this.loginDialogHeader).toContainText('Welcome')
    await this.userName.fill(username)
    await this.password.fill(password)
    await this.loginDialogBtn.click();
    await expect(this.userProfileName).toHaveText(username.toLowerCase())
    }


}

module.exports = {LoginPage};