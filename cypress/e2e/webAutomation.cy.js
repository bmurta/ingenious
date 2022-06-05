// <reference types="Cypress" />
describe("Web Automation tests", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce"); //Logs in as a standard user
  });
  it("Finds an item by nameadds it to the cart, checks if its correct, then purchase the product", () => {
    cy.get('[class="inventory_item_description"]').contains(
      "Sauce Labs Backpack"
    ); // Verifies if an item nanmed "Sauce Labs Backpack" exists
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click(); //Clicks on add to cart for the backpack
    cy.get('[class="inventory_item_description"]').contains(
      "Sauce Labs Bike Light"
    );
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click(); //Clicks on add to cart for the bike lights
    cy.get(".shopping_cart_link").click();
    cy.url().should("eq", "https://www.saucedemo.com/cart.html"); //Verifies that cart was opened via url
    cy.contains("Sauce Labs Bike Light")
      .get('[data-test="remove-sauce-labs-bike-light"]')
      .click(); //Finds the sauce labs bike light and removes it from cart
    cy.get(".cart_list .cart_item")
      .should("have.length", 1)
      .should("contain", "Sauce Labs Backpack"); //Validate the cart only contains 1 item and the item is Sauce labs backpack
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("Bruno");
    cy.get('[data-test="lastName"]').type("Murta");
    cy.get('[data-test="postalCode"]').type("90210");
    cy.get('[data-test="continue"]').click();
    cy.get(".summary_subtotal_label").then(subtotal => {
      expect(subtotal[0].innerText).to.be.eq("Item total: $29.99"); //Verifies the subtotal to be $29.99
    });
    cy.get('[data-test="finish"]').click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html"); //Verifies that the url changed to checkout complete
    cy.get(".complete-header").should("contain", "THANK YOU FOR YOUR ORDER"); //Verifies the order has been completed by checking for header with the thank you text
  });
  it("Validate that sorting by name is right", () => {
    cy.checkAtoZsorting(); //Checks sorting by A to Z
  });
  it("Validate that sorting by price is right", () => {
    cy.checkPriceSorting(); // Checks sorting by low to high price
  });
  it("Tries to login as locket_out_user", () => {
    cy.login("locked_out_user", "secret_sauce"); //Tries to login as locket_out_user, then validates if login is sucessful, this will fail
  });
});
