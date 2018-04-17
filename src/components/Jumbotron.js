import React from 'react';

const Jumbotron = () => (
	<div className="jumbotron">
		<h1 style={{ textDecoration: 'underline' }} className="display-4">Welcome To Boilerplate</h1>
		<p className="lead">Drag and drop snippets to draft a new document</p>
		<hr className="my-4" />
		<p>When you're done, click the button to download text as a word document.</p>
		<a className="btn btn-primary btn-lg" href="#" role="button">Download .docx</a>
	</div>
)

export default Jumbotron;