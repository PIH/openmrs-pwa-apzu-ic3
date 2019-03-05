describe('Sputum station', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.init();
  });
  
  it('Should search for patient and select "No" in "Sputum received Obs" in SPUTUM form', () => {
    cy.searchPatientByID('MGT-0148-CCC');
  
    // Select the patient
    cy.get('.card-list')
      .first()
      .click();
  
    // Navigate to htc summary
    cy.get('[href="#/screening/tb-test/form"]')
      .first()
      .click();
  
    // Navigate to htc form
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
  
        // Select "No" on Sputum received
        cy.get('.form-group .btn')
          .eq(1)
          .click();

        // Assert that we are on the "Sputum Received" Obs
        cy.get('.form-horizontal .control-label')
          .eq(0)
          .contains('Sputum Received');
  
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

  it('should complete tb test result form with valid values', () => {
    cy.searchPatientByID('MGT-0148-CCC');
  
    // Select the patient
    cy.get('.card-list')
      .first()
      .click();
  
    // Navigate to htc summary
    cy.get('[href="#/screening/tb-test/form"]')
      .first()
      .click();
  
    // Navigate to htc form
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
  
        // Select "YES" on Sputum received
        cy.get('#yes')
          .click();

        // Select "Neno GeneXpert" on Laboratory location
        cy.get('#neno_genexpert')
          .click();

        // Select "Satiisfactory" on Sample quality
        cy.get('#satisfactory')
          .click();

        // Select "GeneXpert" on TB test type
        cy.get('#genexpert')
          .click();

        // Select "Detected" on GeneXpert result
        cy.get('#detected')
          .click();

        cy.wait(3000);

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

  after(() => {
    cy.logout();
  });
});
