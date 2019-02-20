describe('Search', function () {

  before(function () {
    cy.init();
    cy.login();
  });

  it('Should search for patient by name', function () {
    cy.searchPatientByName('john');
  });

  it('Should search for patient by identifier', function () {
    cy.searchPatientByID('MGT-0148-CCC');
  });

  after(function () {
    cy.logout();
  });
});
