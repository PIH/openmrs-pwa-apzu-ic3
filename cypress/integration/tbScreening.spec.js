describe('tbScreening station', function () {
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
    cy.get('[href="#/screening/tb/form"]')
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
  
        // Select YES on Cough
        cy.get('.form-group .btn')
          .eq(0)
          .click();

        // Assert that we are on the "Cough" Obs
        cy.get('.form-group .control-label')
          .eq(0)
          .contains('Cough');
  
        // Select NO on Fever
        cy.get('.form-group .btn')
          .eq(3)
          .click();

        // Assert that we are on the "Fever" Obs
        cy.get('.form-group .control-label')
          .eq(1)
          .contains('Fever');
  
        // Select YES on Night sweats
        cy.get('.form-group .btn')
          .eq(4)
          .click();

        // Assert that we are on the "Night sweats" Obs
        cy.get('.form-group .control-label')
          .eq(2)
          .contains('Night sweats');
  
        // Select YES on Weight loss
        cy.get('.form-group .btn')
          .eq(6)
          .click();

        // Assert that we are on the "Weight loss" Obs
        cy.get('.form-group .control-label')
          .eq(3)
          .contains('Weight Loss');
  
        // Select No on Recent contact with active TB (<1 year)
        cy.get('.form-group .btn')
          .eq(9)
          .click();

        // Assert that we are on the "Recent contact with active TB (<1 year)" Obs
        cy.get('.form-group .control-label')
          .eq(4)
          .contains('Recent contact with active TB (<1 year)');
  
        // Select No on Painful neck and armpit lymph nodes
        cy.get('.form-group .btn')
          .eq(11)
          .click();

        // Assert that we are on the "Painful neck and armpit lymph nodes" Obs
        cy.get('.form-group .control-label')
          .eq(5)
          .contains('Painful neck and armpit lymph nodes');

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
