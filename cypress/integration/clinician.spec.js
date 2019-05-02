import { RESPONSE } from '../support/constants';
describe('Clinician station', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    const { PATIENT_ENCOUNTER_CLINICIAN, IC3_SCREENING_DATA } = RESPONSE;
    cy.init(PATIENT_ENCOUNTER_CLINICIAN, IC3_SCREENING_DATA);
  });
  
  it('Should search for patient and select "Exit from care" clinical outcome', () => {
    cy.searchPatientByID('MGT 148 CCC');
  
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
        cy.get('.form-group textarea')
          .first()
          .type('this is a demo clinician note');
            
        // Fill the clinician outcome with "Exit from care"
        cy.get('.form-group label')
          .eq(3)
          .click();
        
        // Fill the reason to stop care
        cy.get('.form-group textarea')
          .last()
          .type('this is a demo reason to stop care');

        // Assert that the correct form is being populated
        cy.get('label.control-label')
          .eq(2)
          .contains('Reason to stop care');

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

  it('should select "transfer to another facility" clinical outcome', () => {
    // Put the form in edit mode
    cy.get('.form-action-btns > button')
      .first()
      .click();
    cy.wait(2000);
    
    // Select Clinical outcome (transfer to another facility)
    cy.get('.form-group label')
      .eq(1)
      .click();
  
    // Fill the transfer facility
    cy.get('.form-group textarea')
      .last()
      .type('this is a demo transfer facility');

    // Assert that the correct form is being populated
    cy.get('label.control-label')
      .eq(2)
      .contains('Transfer Facility (Transfer out to location)');

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
  

  it('should select "Clinical follow-up" clinical outcome', () => {
    // Put the form in edit mode
    cy.get('.form-action-btns > button')
      .first()
      .click();
    cy.wait(2000);
    
    // Select Clinical follow-up (Clinical outcome)
    cy.get('.form-group label')
      .first()
      .click();
  
    // Todo figure out how to test the date-picker
    // Fill the Appointment time
    // cy.get('.form-group textarea')
    //   .last()
    //   .type('this is a demo other outcome');

    // Fill the appointment time (AM/PM)
    cy.get('label')
      .last()
      .click();

    // Assert that the correct form is being populated
    cy.get('label.control-label')
      .eq(2)
      .contains('Appointment time');

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
  
  after(() => {
    cy.logout();
  });
});
