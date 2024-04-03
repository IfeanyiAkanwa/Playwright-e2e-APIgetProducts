import {expect} from '@playwright/test'
class apiUtils{
    
    constructor(page,apiContext){
        
        this.apiContext = apiContext
        this.page = page
       // this.products = product
        this.productNames = page.locator("div h4.product-name")
    }

    async getAllProducts(){
      const response =  await this.apiContext.post("https://rahulshettyacademy.com/seleniumPractise/data/products.json")
      const responsejson = await response.json()
    //   for (const product of responsejson){
    //       console.log("This are all the values in response" + product.id,product.name, product.price, product.category)
    //   }
    responsejson.forEach(product=>{
        console.log("Product Id:" +product.id)
        console.log("Product Id:" +product.name)
        console.log("Product Id:" +product.price)
        console.log("Product Id:" +product.category)
        console.log("-------------------------------------")
     })
     

    }

    async assertApiResponse(){
        
        const response =  await this.apiContext.post("https://rahulshettyacademy.com/seleniumPractise/data/products.json")
        const responsejson = await response.json()
        const productNames = await this.productNames.allTextContents()
        const productNamesCount = await this.productNames.count()
        await console.log(productNames)
        for (let i = 0; i < productNamesCount; i++){
            const webProductName = await this.productNames.nth(i).textContent()
            console.log("Web" +webProductName)
            console.log("API Product Name:", responsejson[i].name);
            await expect(responsejson[i].name).toEqual(webProductName) 
             
        } 
        
      
        
    }
}

module.exports = {apiUtils}