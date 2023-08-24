describe('Main functionalities test', () => {

  //Login test, add all, remove all, leave the site, go back to the site, check if the todos are there, log out.
  
  it('Should go to main page', () => {
    cy.visit('http://127.0.0.1:5173/')
  });

  
  it('Should go to login page and do login and then logout', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.wait(1000);
    cy.get('.toggle').click();
    cy.get('a[href="/login"]').click();

    //does login
    cy.get('input[placeholder="username"]').type('paulo');
    cy.contains('button', 'Login').click();
    cy.contains('h1', 'todos').should('be.visible');
    cy.contains('button', 'Logout').click();
    cy.contains('h1', 'Login').should('be.visible');
  });

  it('Should add 3 todos and then remove middle todo', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.get('input.input-text').type('todo 1');
    cy.get('button.input-submit svg').click();
    cy.contains('span', 'todo 1').should('be.visible');
    cy.get('input.input-text').type('todo 2');
    cy.get('button.input-submit svg').click();
    cy.contains('span', 'todo 2').should('be.visible');
    cy.get('input.input-text').type('todo 3');
    cy.get('button.input-submit svg').click();
    cy.contains('span', 'todo 3').should('be.visible');

    //should delete todo 2

    cy.visit('http://127.0.0.1:5173/')
    cy.get('li._item_1rwmj_1:eq(1) svg').click();
    cy.contains('span', 'todo 2').should('not.exist');

    //should preserve cookies

    cy.visit('http://127.0.0.1:5173/')
    cy.contains('span', 'todo 1').should('be.visible');
    cy.contains('span', 'todo 3').should('be.visible');
    cy.contains('span', 'todo 2').should('not.exist');
  });

})