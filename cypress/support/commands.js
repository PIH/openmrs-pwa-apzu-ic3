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
    .clear()
    .type(Cypress.env('username'))
    .should('have.value', Cypress.env('username'));

  cy.get('[name=password]')
    .clear()
    .type(Cypress.env('password'))
    .should('have.value', Cypress.env('password'));

  cy.get('[name=location]')
    .select(Cypress.env('location'));

  cy.get('[name=location]')
    .should('have.value', Cypress.env('locationUuid'));

  cy.get('[type=submit]')
    .click();

  cy.wait(3000);
  cy.get('.user-display')
    .should('exist')
    .should('be.visible');
});

Cypress.Commands.add("searchPatientByName", (patientName) => {
  cy.visit('/#/searchPatient');
  cy.get('.name-filter')
    .find('[name="patient-name"]')
    .type(patientName);

  cy.get('.server-search > button')
    .click();

  cy.wait(25000);
  cy.get('.card-list')
    .should('exist');
});

Cypress.Commands.add("searchPatientByID", (patientID) => {
  const patientIdentifier = patientID.split('-');

  cy.visit('/#/searchPatient');
  cy.get('.identifier-filter  select')
    .first()
    .select(patientIdentifier[0]);

  cy.get('.identifier-filter-number-input')
    .type(patientIdentifier[1]);

  patientIdentifier[2] && cy.get('.identifier-filter  select')
    .last()
    .select(patientIdentifier[2]);

  cy.get('.server-search > button')
    .click();

  cy.wait(17000);
  cy.get('.card-list')
    .should('exist');

});


Cypress.Commands.add("logout", () => {
  // TODO get this to work

  cy.get('.user-display')
    .find('[data-icon="user"]')
    .first()
    .click();

  cy.get('[href="#/logout"]')
    .first()
    .click({ force: true });

  cy.wait(5000);

  cy.get('.user-display')
    .should('not.exist');

  // Clear the value of the username field
  cy.get('[name=username]')
    .clear();

  // Clear the value of the password field
  cy.get('[name=password]')
    .clear();
});

Cypress.Commands.add('loginWithInvalidInfo', () => {

  cy.visit('/');

  cy.get('[name=username]')
    .type('some-ranndom-username')
    .should('have.value', 'some-ranndom-username');

  cy.get('[name=password]')
    .type('password')
    .should('have.value', 'password');

  cy.get('[name=location]')
    .select(Cypress.env('location'));

  cy.get('[type=submit]')
    .click();

  cy.wait(5000);

  cy.get('.user-display')
    .should('not.exist');
  
  cy.get('.alert.alert-info').contains('Invalid username or password')
    .should('exist');
});
