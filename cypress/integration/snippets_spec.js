import faker from 'faker';

import { siteUrl } from '../support/data';

describe('Snippets', () => {

	it('should log in and go to snippet page', () => {
		cy.wait(1000)
		cy.signInViaFunction();
	})

	it('should filter snippets', () => {
		cy.visit(siteUrl + '/snippets');
		cy.clearSnippets();
		cy.addSampleSnippets();
		cy.get('.card').its('length').should('be', 4)
		cy.get('[data-test="search"]').type('Praesent aliquet placerat')
		cy.get('.card').its('length').should('be', 1)
		cy.clearSnippets();
	})

	it('should add new snippet', () => {
		cy.visit(siteUrl + '/snippets');

		cy.clearSnippets(); // reset

		const [title, text] = [faker.lorem.words(), faker.lorem.paragraph()];
		const tags = Array.from({ length: 4 }, () => faker.lorem.word())

		cy.contains('Add New Snippet').click();

		cy.get('.modal-body').should('be.visible')

		cy.get('[data-test="title"]')
			.type(title)

		cy.get('[data-test="text"]')
			.type(text)

		tags.forEach(tag => {
			cy.get('#tags') // data-test does not show up
				.type(`${tag}{enter}`, { force: true })
		})

		cy.get(`.modal-body`)
			.click();

		cy.contains('Submit').click();
		cy.get('.modal-content').should('not.be.visible')

		// check new card is there
		cy.contains(title);
		cy.contains(text.substring(0, 20));
		tags.forEach(tag => {
			cy.contains(tag);
		})

	})


	it('should edit snippet', () => {

		cy.get('.card').last().find('.card-title').then(title => {

			const titleAddition = '!!!'
			const newTag = faker.lorem.word();

			cy.get('.card').last().find('a').click();
			cy.get('[data-test="title"]').type(titleAddition)
			cy.get('#tags').type(`${newTag}{enter}`);

			cy.get(`.modal-body`).click();
			cy.contains('Update').click();

			cy.get('.card').last().contains(title.text() + titleAddition)
			cy.get('.card').last().contains(newTag)

		})
	})


	it('should delete snippet', () => {

		cy.get('.card').last().find('.card-title').then(title => {

			cy.get('.card').last().find('a').click();
			cy.contains('Delete').click();

			cy.contains('No Snippets Yet!')
		});

	})

})