import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`

const Nav = () => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
		<Container>
			<div className="left">
				<a className="navbar-brand" href="#">~Boilerplate Rocks~</a>
				<span className="navbar-text">keep up with your boilerplate</span>
			</div>
			<div className="right">
				<button type="button" className="btn btn-light"><FontAwesomeIcon style={{ marginRight: '6px' }} icon={faGoogle} />Sign in with Google</button>
			</div>
		</Container>
	</nav >
)



export default Nav;