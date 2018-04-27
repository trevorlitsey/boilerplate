// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import firebase, { signInWithEmailAndPassword, signOut } from '../../src/firebase';
import { siteUrl } from './data';

Cypress.Commands.add('signInViaAdminPage', () => {

	firebase.auth().signOut() // make sure we're signed out

	cy.visit(siteUrl + '/admin');
	cy.get('#email').type('test@test.com')
	cy.get('#password').type('testtest')
	cy.contains('Sign in').click()

})

Cypress.Commands.add('signInViaFunction', () => {

	firebase.auth().signOut() // make sure we're signed out

	firebase.auth().signInWithEmailAndPassword('test@test.com', 'testtest')
		.then(() => console.log('successfully signed in'))
		.catch(err => console.error(err));

})

Cypress.Commands.add('signOut', () => {
	firebase.auth().signOut()
})