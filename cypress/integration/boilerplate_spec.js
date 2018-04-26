const siteUrl = 'http://localhost:8080'

describe('Boilerplate', () => {

	it('should log in and redirect to home page', () => {
		cy.visit('localhost:8080/admin')

		cy.get('#email')
			.type('test@test.com')

		cy.get('#password')
			.type('testtest')

		cy.contains('Sign in').click();

		cy.url().should('eq', siteUrl + '/')
	})

	it('should visit Snippets page on nav click', () => {
		cy.visit('localhost:8080')
		cy.contains('Snippets').click();
		cy.url().should('eq', siteUrl + '/snippets')
	})

	context('Snippets', () => {
		beforeEach(() => {
			cy.visit(siteUrl + '/snippets')
		})

		it('should add new snippet', () => {
			cy.contains('Add New Snippet').click();

			cy.get('#title')
				.type('this is a title')

			cy.get('#text')
				.type('this is a some short text')

			cy.get('#tags')
				.type('these{enter}', { force: true })

			cy.get('#tags')
				.type('are{enter}', { force: true })

			cy.get('#tags')
				.type('some{enter}', { force: true })

			cy.get('#tags')
				.type('tags{enter}', { force: true })

			cy.get('.modal-body')
				.click();

			cy.contains('Submit').click();

			// TODO
			// modal should not be visible
			// card should be present

		})


	});


	xit('should visit Snippets page on `Click here to add snippets` click', () => {
		cy.visit('localhost:8080/snippets')
		cy.contains('here').click();
		cy.url().should('include', '/snippets')
	})

	xit('should visit Preview page on nav click', () => {
		cy.visit('localhost:8080/snippets')
		cy.contains('Preview').click();
		cy.url().should('include', '/')
	})

	xit('should visit Previw page on logo click', () => {
		cy.visit('localhost:8080/snippets')
		cy.contains('Better Boilerplate').click();
		cy.url().should('include', '/')
	})

})