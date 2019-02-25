describe('EID form', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.init();
  });
  
  it(`Should not display any other question when "Breastfeeding" answer is not "stopped over 6 weeks ago"`, () => {
  });

  it(`Should display "Test-Type" question when "Breastfeeding" answer is "stopped over 6 weeks ago"`, () => {
  });

  it(`Should display "Results" question when "Test-Type" answer is "HIV Rapid Test"`, () => {   
  });

  it(`Should display "Bled" question when "Test-Type" answer is "DNA PCR"`, () => {    
  });

  after(() => {
    cy.logout();
  });
});
