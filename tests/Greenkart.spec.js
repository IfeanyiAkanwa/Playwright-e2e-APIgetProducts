import {test, expect, request} from '@playwright/test'
import {Greenkart} from '../pageobject/Greenkart'
import {TopDeals} from '../pageobject/TopDeals'
import {apiUtils} from '../utils/apiUtils'
import datasets from '../utils/greenkartTestData.json'


const data = JSON.parse(JSON.stringify(datasets))
let apiutils;
let allProducts;

// test.beforeAll(async ({browser})=>{

// })

test("Greenkart End to End", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const greenkart = new Greenkart(page)
    await greenkart.navigateToURL();
    await greenkart.searchForItem(data[0].productName)
    await greenkart.proceedToCheckout(data[0].productName, data[0].countryName)


})

test("Handling windows", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const greenkart = new Greenkart(page)
    await greenkart.navigateToURL();
    const topDealsbtn = page.getByText("Top Deals")
    
    const [topDealPage] = await Promise.all([
        context.waitForEvent('page'),
        topDealsbtn.click()
    ])
    const greenkartTopdeals = new TopDeals(topDealPage)
    await greenkartTopdeals.topDealsWindowHandler(data[1].topdeals.filterName);


})

test.only("Confirm that the product names returned in API are same with UI", async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage();
    const apiContext = await request.newContext();
    const greenkart = new Greenkart(page)
    apiutils = await new apiUtils(page, apiContext)
    allProducts = await apiutils.getAllProducts();
    await greenkart.navigateToURL();
    await apiutils.assertApiResponse()
})
