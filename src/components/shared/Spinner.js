import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import styled from 'styled-components';

const Wrapper = styled.div`
	.icon {
		display: flex;
		min-width: 50px;
		margin: auto;
		font-size: 2rem;
		color: var(--blue);
		opacity: .6;
	}
`

const Spinner = () => (
	<Wrapper>
		<FontAwesomeIcon className="icon" icon={faSpinner} spin />
	</Wrapper>
)

// no props

export default Spinner;