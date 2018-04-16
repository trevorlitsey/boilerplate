import React from 'react';
import { Alert } from 'react-bootstrap';

import Layout from '../components/Layout';
import Preview from '../components/Preview';

const Index = () => (
	<Layout>
		<h2 style={{ textDecoration: 'underline' }}>Document</h2>
		<Preview />
	</Layout>
)

export default Index;