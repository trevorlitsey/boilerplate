import React from 'react';

import Layout from '../components/Layout';

class Snippets extends React.PureComponent {

	render() {

		const { location } = this.props;

		return (
			<Layout location={location}>
				<h1>these are some snippets</h1>
			</Layout>
		)
	}
}

export default Snippets;