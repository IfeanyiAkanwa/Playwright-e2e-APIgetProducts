import {expect} from '@playwright/test'
class ChangeLanguage{

    constructor(page){
        this.page = page
        this.languagedrop = page.locator(".current-lang").nth(1)
        this.languagedropItem = page.locator("div .change-lang ul")
        this.languageOptionAssert = page.locator("a[href *=virtual]")
    }

async chooseLanguage(){
    const desiredLanguage = "ES - Español"
    await this.languagedrop.hover();
    const itemCount =  await this.languagedropItem.locator("li").count();
    console.log("This is number of countries" +itemCount)
    const listOfLang = await this.languagedropItem.locator("li span").allTextContents();
    console.log(listOfLang);

    for (let i = 0; i < itemCount; i++){
        if (await this.languagedropItem.locator("li span").nth(i).textContent() === desiredLanguage){
            await this.languagedropItem.locator("li span").nth(i).click();
            break;
        }
   
    }
    await this.page.waitForTimeout(2000);
    const optionAssert = await this.languageOptionAssert.textContent();
    console.log(optionAssert);
    await expect(this.languageOptionAssert).toHaveText(optionAssert)




}

}

module.exports = {ChangeLanguage};