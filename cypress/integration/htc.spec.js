describe('HTC station', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.init();
  });
  
  it('Should search for patient and select "Non-Reactive" in HTC form', () => {
    cy.searchPatientByID('MGT 148 CCC');
  
    // Select the patient
    cy.get('.card-list')
      .first()
      .click();
  
    // Navigate to htc summary
    cy.get('[href="#/screening/htc/form"]')
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
  
        // Select "Non-Reactive" on Cough
        cy.get('.form-group .btn')
          .eq(1)
          .click();

        // Assert that we are on the "Results" Obs
        cy.get('.form-horizontal .control-label')
          .eq(0)
          .contains('Results');
  
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

  it('should select "Reactive" in HTC form', () => {
    // Put form in EDIT mode
    cy.get('.form-action-btns > button')
      .first()
      .click();
    cy.wait(2000);
  
    // Select "Reactive" on Cough
    cy.get('.form-group .btn')
      .eq(0)
      .click();

    // Assert that we are on the "Results" Obs
    cy.get('.form-horizontal .control-label')
      .eq(0)
      .contains('Results');
  
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

  it('should select "Not performed today" in HTC form', () => {
    // Put form in EDIT mode
    cy.get('.form-action-btns > button')
      .first()
      .click();
    cy.wait(2000);
  
    // Select "Not performed today" on Cough
    cy.get('.form-group .btn')
      .eq(2)
      .click();

    // Assert that we are on the "Results" Obs
    cy.get('.form-horizontal .control-label')
      .eq(0)
      .contains('Results');
  
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
