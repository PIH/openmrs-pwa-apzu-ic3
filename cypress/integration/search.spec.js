describe('Search', function () {

  before(function () {
    cy.init();
    // cy.clearLoginPage();
    // cy.wait(3000);
    // cy.login();
    cy.wait(5000);
  });

  it('Should search for patient by name', function () {
    cy.searchPatientByName('john');
  });

  it('Should search for patient by identifier', function () {
    cy.searchPatientByID('MGT-0148-CCC');
  });

  // after(function () {
  //   cy.logout();
  // });
});
