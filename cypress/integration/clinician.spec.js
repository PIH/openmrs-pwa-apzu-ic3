import { RESPONSE } from '../support/constants';
describe('Clinician station', function () {

  before(function () {
    cy.init(RESPONSE.GET_PATIENT_ENCOUNTER_CLINICIAN);
    cy.login();
  });
      
  it('Should search for patient and fill his clinician form', function () {
    cy.searchPatientByID('MGT-0148-CCC');
  
    // Select the patient
    cy.get('.card-list')
      .first()
      .click();
  
    // Navigate to clinician summary
    cy.get('[href="#/screening/clinician/form"]')
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
  
        // Fill the clinician note
        cy.get('.textarea.form-control')
          .first()
          .type('this is a demo clinician note');
            
        // Fill the clinician outcome with "Exit from care"
        cy.get('.form-group label')
          .eq(2)
          .click();
        
        // Fill the reason to stop care
        cy.get('.textarea.form-control')
          .last()
          .type('this is a demo reason to stop care');

        // Click the save form button
        cy.get('.form-action-btns > button')
          .first()
          .click();
  
        cy.wait(3000);
    
        // Check that the new location was saved properly
        cy.get('.form-group .button-group-view')
          .first()
          .should('not.contain', 'OPD at health center');
      });
  });
  
  after(function () {
    cy.logout();
  });
});
