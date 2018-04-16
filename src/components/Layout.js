import React from 'react';
import styled from 'styled-components';

import Nav from './Nav';

const Wrapper = styled.div`
	margin: 4%;
`

const Layout = (props) => (
	<div>
		<Nav />
		<Wrapper>
			{props.children}
		</Wrapper>
	</div>
)

export default Layout