describe('Blood Pressure', function () {

  before(function () {
    cy.login();
  });
  beforeEach(() => {
    cy.init();
  });

  it('should navigate to the blood pressure form and enter valid values for systolic and diastolic blood pressure', function () {

    cy.searchPatientByID('MGT 148 CCC');

    // Select the patient
    cy.get('.card-list')
      .first();

    cy.wait(10000);

    cy.get('.card-list')
      .first()
      .click();

    cy.wait(12000);

  });

  after(function () {
    cy.logout();
  });
});
