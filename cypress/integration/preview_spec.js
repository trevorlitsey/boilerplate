
import { siteUrl } from '../support/data';

const force = { force: true };

describe('Preview', () => {

	it('should log in and add four new snippets', () => {
		cy.visit(siteUrl);

		cy.signInViaFunction(() => {
			cy.contains('Welcome To Boilerplate')
			cy.clearSnippets();
			cy.addSnippets(4);
			cy.get('.card');
		});

	})

	it('should drag and drop snippet to blank preview section', () => {
		moveFirstSnippetToPreview();
	})

	// TODO
	// let user move back

})


function moveFirstSnippetToPreview() {
	cy.get('[data-test="snippetOrder"]').find('.card').first().find('.card-text').then(text => {
		const cardText = text.text();
		cy.get('[data-test="snippetOrder"]').find('.card').first().focus().type(' ').type('{downarrow}', force).type(' ', force);
		cy.get('[data-test="draftOrder"]').find('.card').first().contains(cardText);
		cy.get('.scrollspy').find('h4').contains(cardText);
	})
}

function moveFirstPreviewToSnippet() {
	cy.get('[data-test="draftOrder"]').find('.card').first().find('.card-text').then(text => {
		const cardText = text.text();
		cy.get('[data-test="draftOrder"]').find('.card').first().focus().type(' {uparrow} ', { delay: 10 });
		cy.get('[data-test="snippetOrder"]').find('.card').first().contains(cardText);
	})
}