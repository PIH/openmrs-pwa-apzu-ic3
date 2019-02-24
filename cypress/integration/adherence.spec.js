describe('Adherence station', function () {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.init();
  });
  
  it('Should search for patient and select YES/NO in the form', function () {
    cy.searchPatientByID('MGT-0148-CCC');
  
    // Select the patient
    cy.get('.card-list')
      .first()
      .click();
  
    // Navigate to clinician summary
    cy.get('[href="#/screening/adherence/form"]')
      .first()
      .click();
  
    // Navigate to clinician form
    cy.get('.summary-swiper-button')
      .click();
  
    cy.wait(3000);
    // Check if form is in edit mode
    cy.get('.form-action-btns > button')
      .first()
      .then(($button) => {
        const text = $button.text();
        // if form is in EDIT mode ...
        if (text === 'Edit') {
  
          // Put form in EDIT mode
          cy.get('.form-action-btns > button')
            .first()
            .click();
          cy.wait(2000);
        }
  
        // Select "2ns Session" on "Adherence Session Obs"
        cy.get('.form-group .btn')
          .eq(1)
          .click();

        // Assert that we are on the "Adherence Session" Obs
        cy.get('.form-horizontal .control-label')
          .eq(0)
          .contains('Adherence Session');
  
        // Fill the "Name of counselor" Obs
        cy.get('input#formAdherenceCounselor')
          .first()
          .type('This is a nock name of counselor');

        // Assert that we are on the "Name of counselor" Obs
        cy.get('.form-horizontal .control-label')
          .eq(1)
          .contains('Name of counselor');
  
        // Select "No" on "Counseled on pill counts" Obs
        cy.get('.form-group .btn')
          .eq(4)
          .click();

        // Assert that we are on the "Counseled on pill counts" Obs
        cy.get('.form-horizontal .control-label')
          .eq(2)
          .contains('Counseled on pill counts');
  
        // Fill the "Drug adherence percentage" Obs
        cy.get('input#formAdherencePercentage')
          .first()
          .type(50);

        // Assert that we are on the "Drug adherence percentage" Obs
        cy.get('.form-horizontal .control-label')
          .eq(3)
          .contains('Drug adherence percentage');
  
        // Select "No" on "Counseled on viral load" Obs
        cy.get('.form-group .btn')
          .eq(6)
          .click();

        // Assert that we are on the "Counseled on viral load" Obs
        cy.get('.form-horizontal .control-label')
          .last()
          .contains('Counseled on viral load');
  
        // Click the save form button
        cy.get('.form-action-btns > button')
          .first()
          .click();
  
        cy.wait(3000);

        // Check that the form attempted to save
        cy.get('.custom-loader')
          .first()
          .should('be.visible');       
      });
  });

  after(function () {
    cy.logout();
  });
});
