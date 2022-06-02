// <reference types="Cypress" />
describe("checkPurchase", () => {
  it("Logs in as a standard user", () => {
    cy.visit("https://www.saucedemo.com/"); //Visits the saucedemo url
    cy.get('[data-test="username"]').type("standard_user"); // types username
    cy.get('[data-test="password"]').type("secret_sauce"); //types password
    cy.get('[id="login-button"]').click(); // Performs login
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html"); //Check, via url change, if login was performed successfully
  });
  it("Finds an item by name, then adds it to the cart", () => {
    cy.get('[class="inventory_item_description"]').contains('Sauce Labs Backpack')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    cy.get('[class="inventory_item_description"]').contains('Sauce Labs Bike Light')
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
  })
  it("Goes to the cart", () => {
    cy.get('[class="shopping_cart_link]').click()
    cy.url().should("eq", "https://www.saucedemo.com/cart.html"); 
  });
});
