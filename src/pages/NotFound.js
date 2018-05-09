import React from 'react';
import styled from 'styled-components';

import { Layout } from '../components/layout';

const NotFound = ({ location }) => {
	return (
		<Layout location={location}>
			<h1 style={{ textAlign: 'center', marginTop: 50, lineHeight: 1.5 }}>404</h1>
			<h4 style={{ textAlign: 'center' }}>Sorry, the page you're looking for is not here!</h4>
		</Layout>
	)
}

export default NotFound;