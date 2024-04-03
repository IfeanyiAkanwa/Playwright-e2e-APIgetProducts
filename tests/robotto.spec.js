import {test, expect} from '@playwright/test'
import {LoginPage} from '../pageobject/LoginPage'
import {ChangeLanguage} from '../pageobject/ChangeLanguage'
import datasets from '../utils/placeholderTestData.json'

const data = JSON.parse(JSON.stringify(datasets));



test('Rollette website', async ({page})=>{
    const loginpage = new LoginPage(page);
    const changeLanguage = new ChangeLanguage(page)
    await loginpage.navigateToLanding();
    await loginpage.LoginDialog(data.username, data.password)
    await changeLanguage.chooseLanguage();
    
})