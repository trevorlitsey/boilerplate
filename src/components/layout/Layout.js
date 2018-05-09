import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';

import Nav from './Nav';
import Footer from './Footer';

const Wrapper = styled.div`
	max-width: 1600px;
	min-height: 95vh;
	margin: 0 auto;
	padding: 4%;
`

const Layout = ({ location, user, children }) => (
	<div>
		<Nav location={location} user={user} />
		<Wrapper>
			{children}
		</Wrapper>
		<Footer />
	</div>
)

Layout.propTypes = {
	location: object.isRequired,
	user: object,
}

export default Layout