# Ingenious Build's Automation Challenge

## Introduction
Welcome, this is my QA Challenge for Ingenious.build, it contains two test suites, one for API automation using [Reqres.in](https://reqres.in/), and another for Front-end autiomation using [Saucedemo.com](https://www.saucedemo.com/). 

This entire challenge has been built using [Cypress](https://www.cypress.io/), with a little help from [Dayjs](https://day.js.org/) to validate current dates.

## Why Cypress
Cypress is an open-source testing framework based on JavaScript, which allows for easy web application testing.

It's been a passion of mine for the past 3 years, ever since i discovered it. Cypress's flexibility allows for easy creation of end-to-end tests, removing a lot of the needlessly complicated setup found in most other testing frameworks, and abstracting a lot of concepts while allowing fast and effienct test building.

While not the most versatile tool for the job, it also allows for API and integration testing, which has been done on the same environment as the front-end tests, simplifying integration on CI pipelines.

## How to set it up

To run the test suite, an environment running [nodejs](https://nodejs.org/en/) is required.

Test suites are located in the folder `cypress\e2e`, and helper functions are located in `cypress\support\commands.js`

Cypress will automatically record videos and take screenshots upon test execution.

## How to execute it

1. On a terminal, run `npm install`, Cypress will install along with the suite's package.
2. To run the Cypress testing suite on a command line, executing both suites one after another, use `npm run cypress`
3. To run Cypress with a GUI, use `npm run cypress:open`, once its open, select E2E testing, choose your preferred browser, and run each suite individually.

## How to develop for it
To develop new test suites, create a file with the `.cy.js` extension inside `cypress\e2e` folder. 

On the `cypress\support\commands.js` file, you can create cypress functions, which can be used to repeat simple tasks shorten suite lenghts. You can call those functions during any suite using `cy.`