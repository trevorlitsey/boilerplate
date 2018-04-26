describe('Boilerplate', () => {

	xit('should log in', () => {
		cy.visit('localhost:8080')
		cy.contains('Sign in').click();
		// TODO

	})

	it('should visit Snippets page on nav click', () => {
		cy.visit('localhost:8080')
		cy.contains('Snippets').click();
		cy.url().should('include', '/snippets')
	})

	it('should visit Snippets page on `Click here to add snippets` click', () => {
		cy.visit('localhost:8080')
		cy.contains('here').click();
		cy.url().should('include', '/snippets')
	})

	it('should visit Preview page on nav click', () => {
		cy.visit('localhost:8080/snippets')
		cy.contains('Preview').click();
		cy.url().should('include', '/')
	})

	it('should visit Previw page on logo click', () => {
		cy.visit('localhost:8080/snippets')
		cy.contains('Better Boilerplate').click();
		cy.url().should('include', '/')
	})

})