import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';

import Nav from './Nav';

const Wrapper = styled.div`
	max-width: 1600px;
	margin: auto;
	padding: 40px;
`

const Layout = ({ location, children }) => (
	<div>
		<Nav location={location} />
		<Wrapper>
			{children}
		</Wrapper>
	</div>
)

Layout.propTypes = {
	location: object.isRequired,
}

export default Layout