describe('Search', () => {

  before(() => {
    cy.login();
  });

  it('Should search for patient by name', () => {
    cy.searchPatientByName('john');
  });

  it('Should search for patient by identifier', () => {
    cy.searchPatientByID('MGT 148 CCC');
  });

  after(() => {
    cy.logout();
  });
});
