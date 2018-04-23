import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';

const NotFound = ({ location }) => {
	return (
		<Layout location={location}>
			<h1 style={{ textAlign: 'center', marginTop: 50, lineHeight: 1.5 }}>404</h1>
			<h4 style={{ textAlign: 'center' }}>Sorry, the page you are looking for is not here!</h4>
		</Layout>
	)
}

export default NotFound;