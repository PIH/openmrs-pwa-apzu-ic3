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

  it('should select "Yes" in "Sputum Received Obs" and "Un-satisfactory" in "Sample Quality Obs" in SPUTUM form', () => {
    // Put form in EDIT mode
    cy.get('.form-action-btns > button')
      .first()
      .click();
    cy.wait(2000);
  
    // Select "Yes" on "Sputum received Obs"
    cy.get('.form-group .btn')
      .eq(0)
      .click();

    // Assert that we are on the "Sputum Received" Obs
    cy.get('.form-horizontal .control-label')
      .eq(0)
      .contains('Sputum Received');
  
    // Select "Un-satisfactory" on "Sample Quality Obs"
    cy.get('.form-group .btn')
      .eq(3)
      .click();

    // Assert that we are on the "Sample Quality" Obs
    cy.get('.form-horizontal .control-label')
      .eq(1)
      .contains('Sample Quality');

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

  it('should select "Yes" in "Sputum Received Obs" and "Satisfactory" in "Sample Quality Obs" in SPUTUM form', () => {
    // Put form in EDIT mode
    cy.get('.form-action-btns > button')
      .first()
      .click();
    cy.wait(2000);
  
    // Select "Yes" on "Sputum received Obs"
    cy.get('.form-group .btn')
      .eq(0)
      .click();

    // Assert that we are on the "Sputum Received" Obs
    cy.get('.form-horizontal .control-label')
      .eq(0)
      .contains('Sputum Received');
  
    // Select "Satisfactory" on "Sample Quality Obs"
    cy.get('.form-group .btn')
      .eq(2)
      .click();

    // Assert that we are on the "Sample Quality" Obs
    cy.get('.form-horizontal .control-label')
      .eq(1)
      .contains('Sample Quality');

    // Select "Lisungwi GeneXpert" on "Laboratory location Obs"
    cy.get('.form-group .btn')
      .eq(5)
      .click();

    // Assert that we are on the "Laboratory Location" Obs
    cy.get('.form-horizontal .control-label')
      .eq(2)
      .contains('Laboratory Location');
  

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
