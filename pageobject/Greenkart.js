import {expect} from '@playwright/test'
class Greenkart{

    constructor(page){
        this.page  = page
        this.greenkartLogo = page.locator(".brand.greenLogo")
        this.documentLink = page.locator("a[href *= 'rahulshettyacademy.com']").nth(0)
        this.searchBox = page.getByPlaceholder("Search for Vegetables and Fruits")
        this.addtoCartBtn = page.getByText("ADD TO CART")
        this.products = page.locator(".product")
        this.productNames = page.locator("div h4.product-name")
        this.incrementbtn = page.locator(".increment")
        this.cartBtn = page.locator("img[alt='Cart']")
        this.cartAddedProduct = page.locator("p.product-name")
        this.proceedToCheckoutbtn = page.getByText("PROCEED TO CHECKOUT")
        this.tableItems = page.locator("tbody td")
        this.placeOrder = page.getByText("PLACE ORDER")
        this.dropdownbtn = page.locator("//select")
        this.checkBox = page.locator(".chkAgree")
        this.proceed = page.getByText("Proceed")
        this.tableHeader = page.locator("thead td")
        this.thankyou = page.locator("span").nth(1)
        
    }

    async navigateToURL(){
        await this.page.goto("https://rahulshettyacademy.com/seleniumPractise/#/")
        await expect(this.page).toHaveTitle("GreenKart - veg and fruits kart")
        await expect(this.page).toHaveURL("https://rahulshettyacademy.com/seleniumPractise/#/")
        await expect(this.greenkartLogo).toContainText("GREEN")
        // await expect(this.documentLink).toHaveAttribute('class', 'blinkingText')
        }
    async searchForItem(productName){
        await this.searchBox.pressSequentially("cu", {delay: 1000})
        await this.page.waitForTimeout(2000);
        const productCount = await this.products.count();
        console.log(productCount)
        const productNames = await this.productNames.allTextContents()
        console.log("This is the list of filtered products" +productNames)
        for (let i = 0; i < productCount; i++){
            if (await this.productNames.nth(i).textContent() === productName){
                await this.incrementbtn.nth(i).click();
                await this.addtoCartBtn.nth(i).click();
                await this.cartBtn.click();
                await expect(this.cartAddedProduct.nth(i)).toHaveText(productName)
                break;

            }

        }
    }
    async proceedToCheckout(productName, CountryName){
        await this.proceedToCheckoutbtn.click();
        await this.page.waitForTimeout(2000);
        const allItemsDetails = await this.tableItems.allTextContents();
        console.log("This ia all the items " +allItemsDetails)
        const itemsCount = await this.tableItems.count();
        console.log("This is count of the items " +itemsCount)

        for (let i = 0; i < itemsCount; i++){
            if (await this.tableHeader.nth(i).textContent() === "Product Name" ){
            
                console.log("tableHeader")
                await expect(this.tableItems.nth(i)).toContainText(productName)
                await this.placeOrder.click();
                break;
            }
        }
        await this.dropdownbtn.selectOption(CountryName)
        await this.checkBox.click()
        await expect(this.checkBox.isChecked()).toBeTruthy()
        await this.proceed.click();
        await expect(this.thankyou).toContainText("Thank you")


    }
    
}



module.exports = {Greenkart};