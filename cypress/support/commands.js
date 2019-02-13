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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('login', () => {

  cy.visit('/');

  cy.get('[name=username]')
    .type(Cypress.env('username'))
    .should('have.value', Cypress.env('username'));

  cy.get('[name=password]')
    .type(Cypress.env('password'))
    .should('have.value', Cypress.env('password'));

  cy.get('[name=location]')
    .select(Cypress.env('location'));

  cy.get('[name=location]')
    .should('have.value', Cypress.env('locationUuid'));

  cy.get('[type=submit]')
    .click();

  cy.get('.user-display')
    .should('exist')
    .should('be.visible');

});


Cypress.Commands.add("logout", () => {
  // TODO get this to work

  /* cy.get('.user-display')
     .find('[data-icon="user"]')
     .first()
     .click();

   cy.contains('Logout')
     .find(':visible')
     .click();

   cy.get('.user-display')
     .should('not.exist');*/

});
