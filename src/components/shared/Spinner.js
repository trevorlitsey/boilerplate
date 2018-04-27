import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import styled from 'styled-components';

const icon = ({ className, children }) => (
	<FontAwesomeIcon className={className} icon={faSpinner}>{children}</FontAwesomeIcon>
)

const Spinner = styled(icon) `
	display: flex;
	min-width: 50px;
	margin: auto;
	font-size: 2rem;
	color: var(--blue);
	opacity: .6;
	animation: 1.4s infinite linear rotate;
	
	@keyframes rotate {
		from {
			transform: rotate(0deg)
		}
		
		to {
			transform: rotate(360deg)
		}
	}
`

// no props

export default Spinner;