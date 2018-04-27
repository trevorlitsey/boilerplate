
import { siteUrl } from '../support/data';

const force = { force: true };

describe('Snippets', () => {

	it('should log in and add four new snippets', () => {
		cy.visit(siteUrl);

		cy.signInViaFunction(() => {
			cy.contains('Welcome To Boilerplate')
			// cy.addSnippets(4);
		});

	})

	it('should drag and drop snippet to preview section', () => {
		cy.get('[data-test="snippetOrder"]').find('.card').first().find('.card-text').then(text => {
			const cardText = text.text();
			cy.get('[data-test="snippetOrder"]').find('.card').first().focus().type(' ').type('{downarrow}', force).type(' ', force);
			cy.get('[data-test="draftOrder"]').find('.card').first().contains(cardText);
			cy.get('.scrollspy').find('h4').contains(cardText);
		})
	})

	// TODO
	// move back
	// change order

})
