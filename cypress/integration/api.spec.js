describe('API Tests', function () {

  it('Should check if API server is up', function () {

   cy.openmrsapi();

  });

  it('Should check if we could log on via the legacy OpenMRS UI', function () {

    cy.openmrsapi();
    cy.get('#username')
      .type(Cypress.env('username'))
      .should('have.value', Cypress.env('username'));

    cy.get('#password')
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'));

    cy.get('#login-button').click();

  });

  it('Should login via the REST API', function () {

    cy.loginwithrestapi();

  });

});
