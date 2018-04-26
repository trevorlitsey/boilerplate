import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp';
import styled from 'styled-components';

const Container = styled.div`
	margin: auto;
	text-align: center;
	background: var(--light);
	width: 100%;
	padding: 40px;
	color: var(--secondary);

	& > .icon {
		font-size: 3rem;
		margin-bottom: 10px;
		transform: rotate(50deg);
	}

`

const SignInForm = () => {
	return (
		<Container className="rounded">
			<FontAwesomeIcon icon={faArrowUp} className="icon" />
			<h3>Hey there</h3>
			<h3>Can't do much until you sign in, can we?</h3>
		</Container>
	)
}

// no props

export default SignInForm;