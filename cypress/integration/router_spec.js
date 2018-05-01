import { siteUrl } from '../support/data';

describe('router', () => {

	it('should sign out', () => {
		cy.visit(siteUrl)
		cy.signOut();
	})

	it('should visit Snippets page on nav click', () => {
		cy.visit(siteUrl)
		cy.get('nav').contains('Snippets').click();
		cy.url().should('eq', siteUrl + '/snippets')
	})

	it('should visit Snippets page on `Click here to add snippets` click', () => {
		cy.visit(siteUrl)
		cy.contains('here').click();
		cy.url().should('eq', siteUrl + '/snippets')
	})

	it('should visit Preview page on nav click', () => {
		cy.visit(siteUrl + '/snippets')
		cy.contains('Preview').click();
		cy.url().should('eq', siteUrl + '/')
	})

	it('should visit Preview page on logo click', () => {
		cy.visit(siteUrl + '/snippets')
		cy.contains('Boilerplate').click();
		cy.url().should('eq', siteUrl + '/')
	})

})