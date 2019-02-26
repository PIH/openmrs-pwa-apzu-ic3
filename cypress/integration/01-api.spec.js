describe('API Tests', () => {

  it('Should check if API server is up', () => {

    cy.openmrsapi();

  });

  it('Should check if we could log on via the legacy OpenMRS UI', () => {

    cy.openmrsapi();
    cy.get('#username')
      .type(Cypress.env('username'))
      .should('have.value', Cypress.env('username'));

    cy.get('#password')
      .type(Cypress.env('password'))
      .should('have.value', Cypress.env('password'));

    cy.get('#login-button').click();

  });

  it('Should login via the REST API', () => {

    cy.loginwithrestapi();
  });

  it('Should retrieve Login Locations via REST API', function () {

    cy.request({
      method: 'GET',
      url: Cypress.env('apiServer') + '/ws/rest/v1/location/?tag=Login Location'

    }).then( (response) => {

      expect(response.status).to.eq(200);
      expect(response.body.results.length).to.greaterThan(0); // it should be more than one Login Location
    });

  });

});
