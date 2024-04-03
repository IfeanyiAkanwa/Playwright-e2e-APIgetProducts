import {expect} from '@playwright/test'
class TopDeals{

    constructor(page){
        this.page = page
        //this.topDealsbtn = page.getByText("Top Deals")
        this.topSearchLabel = page.getByLabel("Search:")
        this.topSeachBox =  page.locator("#search-field")
        this.tablehead = page.locator("thead th")
        this.tableBody = page.locator("tbody td")
    }

    async topDealsWindowHandler(filterItem){
        await this.topSearchLabel.isVisible();
        await this.topSeachBox.fill(filterItem)
        const headerCount = await this.tablehead.count();
 
        for (let i = 0; i < headerCount; i++){
         if(await this.tablehead.nth(i).textContent() === "Veg/fruit name"){
             await expect(this.tableBody.nth(i)).toContainText(filterItem)
             const filteredItem = await this.tableBody.nth(i).textContent()
             console.log(filteredItem)
         }
        }
 
         
     }
}

module.exports = {TopDeals};