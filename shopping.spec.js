const { test, expect } = require("@playwright/test");

test("Register User", async ({ page }) => {
    // go to the site
    await page.goto('http://automationexercise.com');

    // verify if the home page visible succesfully
    await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();

    // click on signup/login button
    await page.getByText(' Signup / Login').click();
    await expect(page).toHaveURL("https://automationexercise.com/login");

    // verify 'New User Signup!' is visible
    await expect(page.getByText('New User Signup!')).toBeVisible();

    // enter name and email address
    await page.getByPlaceholder('Name').click();
    await page.getByPlaceholder('Name').fill("feyza");
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill("feyza@g");
    
    // click signup button
    await page.getByRole('button', { name: 'Signup' }).click();
    await expect(page).toHaveURL('https://automationexercise.com/signup');

    // verify 'enter account information' is visible
    await expect(page.getByText('Enter Account Information')).toBeVisible();

    // fill the detail informations
    await page.getByText('Mrs.').check();
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('1234');
    await page.locator('#days').selectOption('9');
    await page.locator('#months').selectOption('February');
    await page.locator('#years').selectOption('2001');

    // Select checkbox 'Sign up for our newsletter!'
    await page.getByRole('checkbox', {name : 'newsletter'}).check();

    // Select checkbox 'Receive special offers from our partners!'
    await page.getByLabel(/Receive special offers .*/).check();

    // // Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await page.getByLabel('First name *').fill("Feyza");
    await page.getByLabel('Last name *').fill("Koç");
    await page.getByLabel('Company', { exact: true }).fill("Amazon");
    await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill("Mahalle1");
    await page.getByLabel('Address 2').fill("Mahalle2");
    await page.getByLabel('Country ').selectOption('United States');
    await page.getByLabel('State ').fill('California');
    await page.getByLabel('City ').fill('Los Angeles');
    await page.locator('#zipcode').fill('90001');
    await page.getByLabel('Mobile Number ').fill('05551119900');

    //  Click 'Create Account button'
    await page.getByRole('button', {name: 'Create Account'}).click();
    await expect(page).toHaveURL('https://automationexercise.com/account_created');

    // Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.getByText('Account Created!')).toBeVisible();

    // click continue button
    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page).toHaveURL('https://automationexercise.com/');

    // Verify that 'Logged in as username' is visible
    await expect(page.getByText(' Logged in as feyza')).toBeVisible();

    // // Click 'Delete Account' button
    // await page.getByRole('link',{name: ' Delete Account'}).click();

    // // Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    // await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();

});

test("Verify All Products and product detail page", async({page})=>{
    await page.goto('https://automationexercise.com/');

    // verify if the home page visible succesfully
    await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();

    // Click on 'Products' button
    await page.getByRole('link', { name: ' Products' }).click();

    // Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

    // The products list is visible
    await expect(page.getByText('All Products  Added! Your product has been added to cart. View Cart Continue Sh')).toBeVisible();
    
    // Click on 'View Product' of first product
    await page.locator('.choose > .nav > li > a').first().click();

    // User is landed to product detail page
    await expect(page).toHaveURL('https://automationexercise.com/product_details/1');

    // Verify that detail detail is visible: product name, category, price, availability, condition, brand
    
    await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByText('Category: Women > Tops')).toBeVisible();
    await expect(page.getByText('Rs. 500')).toBeVisible();
    await expect(page.getByText('Availability:')).toBeVisible();
    await expect(page.getByText('Condition:')).toBeVisible();
    await expect(page.getByText('Brand:')).toBeVisible();
});

test("Verify address details in checkout page", async({page})=> {
    await page.goto('https://automationexercise.com/');

    // verify if the home page visible succesfully
    await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();

    // Click 'Signup / Login' button
    await page.getByText(' Signup / Login').click();
    await expect(page).toHaveURL("https://automationexercise.com/login");

    // verify 'New User Signup!' is visible
    await expect(page.getByText('Login to your account')).toBeVisible();

    // log in
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('feyza@a');
    await page.getByPlaceholder('Password').fill('1234');
    await page.getByRole('button', {name: 'Login'}).click();
    

    // verify logged in succesfully
    await expect(page.getByText(' Logged in as feyza')).toBeVisible();

    // view product
    await page.locator('.choose > .nav > li > a').first().click();

    // Add a product to cart
    await page.getByRole('button', { name: ' Add to cart' }).click();

    // click view cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Verify that cart page is displayed
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');

    // Click Proceed To Checkout
    await page.getByText('Proceed To Checkout').click();

    // Verify that checkout page is displayed
    await expect(page).toHaveURL('https://automationexercise.com/checkout');

    //click place order
    await page.getByRole('link', { name: 'Place Order' }).click();
    
    //enter payment details
    await page.locator('input[name="name_on_card"]').fill('feyza');
    await page.locator('input[name="card_number"]').fill('12345');
    await page.getByPlaceholder('ex. 311').fill('233');
    await page.getByPlaceholder('MM').fill('10');
    await page.getByPlaceholder('YYYY').fill('2023');

    // pay and confirm order
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    //verify order has been confirmed succesfully
    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
    
    //Download invoice
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download Invoice' }).click();
    const download = await downloadPromise;    
});