describe('Viral Load station', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.init();
  });
  
  it('Should search for patient and select "NO" in "BLED" Obs in the Viral-load form',() => {
    cy.searchPatientByID('MGT 148 CCC');
  
    // Select the patient
    cy.get('.card-list')
      .first()
      .click();
  
    // Navigate to clinician summary
    cy.get('[href="#/screening/vl/form"]')
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
  
        // Select "No" on "Viral Load Obs"
        cy.get('.form-group .btn')
          .eq(1)
          .click();

        // Assert that we are on the "Bled Obs"
        cy.get('.form-horizontal .control-label')
          .eq(0)
          .contains('Bled');
  
        // Select "Needs additional adherence counceling" in the "Reason for no sample Obs"
        cy.get('.form-group .btn')
          .eq(5)
          .click();

        // Assert that we are on the "Reason for no sample Obs"
        cy.get('.form-horizontal .control-label')
          .eq(1)
          .contains('Reason for no sample');
  
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

  it('Should select "YES" in "BLED" Obs in the Viral-load form',() => {
    // Put form in EDIT mode
    cy.get('.form-action-btns > button')
      .first()
      .click();
    cy.wait(2000);
  
    // Select "Yes" on "Viral Load Obs"
    cy.get('.form-group .btn')
      .eq(0)
      .click();

    // Assert that we are on the "Bled Obs"
    cy.get('.form-horizontal .control-label')
      .eq(0)
      .contains('Bled');
  
    // Select "Confirmatory" in the "Reason for testing Obs"
    cy.get('.form-group .btn')
      .eq(7)
      .click();

    // Assert that we are on the "Reason for testing Obs"
    cy.get('.form-horizontal .control-label')
      .eq(2)
      .contains('Reason for testing');

    // Select "Linsungwi GeneXpert" in the "Lab Location Obs"
    cy.get('.form-group .btn')
      .eq(11)
      .click();

    // Assert that we are on the "Lab Location Obs"
    cy.get('.form-horizontal .control-label')
      .eq(3)
      .contains('Lab location');
  
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
