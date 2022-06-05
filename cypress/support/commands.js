// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("getSessionStorage", (key) => {
  cy.window().then((window) => window.sessionStorage.getItem(key));
});

Cypress.Commands.add("setSessionStorage", (key, value) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem(key, value);
  });
});

Cypress.Commands.add("login", (username, password) => {
  cy.window().then((window) => {
    window.sessionStorage.setItem("cart-contents", "[1,2]");
  });
  cy.visit("https://www.saucedemo.com/"); //Visits the saucedemo url
  cy.get('[data-test="username"]').type(username); // types username
  cy.get('[data-test="password"]').type(password); //types password
  cy.get('[id="login-button"]').click(); // Performs login
  cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
});
Cypress.Commands.add("checkAtoZsorting", () => {
  cy.get('[ class="product_sort_container"]')
    .select("az")
    .should("have.value", "az");
  cy.get('[class="inventory_item_name"]').should(($item1) => {
    expect($item1).to.have.length(6);
  });
  cy.get('[class="inventory_item_name"]')
    .eq(0)
    .should("have.text", "Sauce Labs Backpack");
  cy.get('[class="inventory_item_name"]')
    .eq(1)
    .should("have.text", "Sauce Labs Bike Light");
  cy.get('[class="inventory_item_name"]')
    .eq(2)
    .should("have.text", "Sauce Labs Bolt T-Shirt");
  cy.get('[class="inventory_item_name"]')
    .eq(3)
    .should("have.text", "Sauce Labs Fleece Jacket");
  cy.get('[class="inventory_item_name"]')
    .eq(4)
    .should("have.text", "Sauce Labs Onesie");
  cy.get('[class="inventory_item_name"]')
    .eq(5)
    .should("have.text", "Test.allTheThings() T-Shirt (Red)");
});

Cypress.Commands.add("checkPriceSorting", () => {
  cy.get('[ class="product_sort_container"]').select("lohi");
  cy.get('[class="inventory_item_name"]').should(($item1) => {
    expect($item1).to.have.length(6);
  });
  cy.get('[class="inventory_item_name"]')
    .eq(0)
    .should("have.text", "Sauce Labs Onesie");
  cy.get('[class="inventory_item_name"]')
    .eq(1)
    .should("have.text", "Sauce Labs Bike Light");
  cy.get('[class="inventory_item_name"]')
    .eq(2)
    .should("have.text", "Sauce Labs Bolt T-Shirt");
  cy.get('[class="inventory_item_name"]')
    .eq(3)
    .should("have.text", "Test.allTheThings() T-Shirt (Red)");
  cy.get('[class="inventory_item_name"]')
    .eq(4)
    .should("have.text", "Sauce Labs Backpack");
  cy.get('[class="inventory_item_name"]')
    .eq(5)
    .should("have.text", "Sauce Labs Fleece Jacket");
})