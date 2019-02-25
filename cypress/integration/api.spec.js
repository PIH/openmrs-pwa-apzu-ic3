describe('API Tests', () => {

  it.skip('Should check if API server is up', () => {

    cy.openmrsapi();

  });

  it.skip('Should check if we could log on via the legacy OpenMRS UI', () => {

    cy.openmrsapi();
    cy.get('#username')
      .type(Cypress.env('username'))
      .should('have.value', Cypress.env('username'));

    cy.get('#password')
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'));

    cy.get('#login-button').click();

  });

  it.skip('Should login via the REST API', () => {

    cy.loginwithrestapi();

  });

});
