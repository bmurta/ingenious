// <reference types="Cypress" />
const dayjs = require("dayjs");

describe("API automation tests", () => {
  it("Gets list of users and logs the ones with odd numbers", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users",
    }).then((response) => {
      expect(response.status).to.be.eq(200); //Validates that the response code is 200
      cy.log(JSON.stringify(response.body.data[0])); //Prints user with ID 1
      cy.log(JSON.stringify(response.body.data[2])); //Prints user with ID 3
      cy.log(JSON.stringify(response.body.data[4])); //Prints user with ID 5
    });
  });
  it("Creates a new user", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/users",
      body: {
        name: "morpheus",
        job: "leader",
      },
    }).then((response) => {
      expect(response.status).to.be.eq(201); //Validates that the response code is 201
      const currentDate = dayjs().format("YYYY-MM-DD"); //Gets today's date using dayjs
      const creationDate = dayjs(response.body.createdAt).format("YYYY-MM-DD"); //Converts the response date into 'YYYY-MM-DD' format
      expect(creationDate).to.be.eq(currentDate); //Validates date is equal to current date
    });
  });
  it("Updates a user", () => {
    const requestBody = {
      job: "zion resident",
      name: "morpheus",
    };
    cy.request({
      method: "PUT",
      url: "https://reqres.in/api/users",
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.be.eq(200); //Validates that the response code is 200
      console.log(response.body);
      expect(response.body).to.contain(requestBody); //Compares the response body with the request body. Cypress does this recursively by default
    });
  });
  it("Get a list of users with a delayed query of 0 seconds", () => {
    cy.delayedUsersQuery(0).then((response) => {
      expect(response.duration).to.be.lessThan(1000); //Validates that the response time is no longer than 1 second
    });
  });
  it("Get a list of users with a delayed query of 3 seconds", () => {
    cy.delayedUsersQuery(3).then((response) => {
      expect(response.duration).to.be.lessThan(1000); //Validates that the response time is no longer than 1 second
      console.log(response);
    });
  });
  it("Gets 10 single users and validates the response codes are 200", () => {
    var id = 1;
    while (id <= 10) {
      cy.userDetails(id);
      id = id + 1;
    }
    // By default, cypress validations happen asynchronously
  });
});
