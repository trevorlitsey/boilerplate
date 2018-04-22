import React from 'react';
import { object } from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`

const Nav = ({ location }) => {

	const { pathname } = location;

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<Container>
				<div className="left">
					<ul className="navbar-nav mr-auto">
						<Link className="navbar-brand" to="/">Better Boilerplate</Link>
						<li className={`nav-item ${pathname === '/' && 'active'}`}>
							<Link className="nav-link" to="/">Preview</Link>
						</li>
						<li className={`nav-item ${pathname === '/snippets' && 'active'}`}>
							<Link className="nav-link" to="/snippets">Snippets</Link>
						</li>
					</ul>
				</div>
				<div className="right">
					<button type="button" className="btn btn-light"><FontAwesomeIcon style={{ marginRight: '6px' }} icon={faGoogle} />Sign in with Google</button>
				</div>
			</Container>
		</nav>
	)
}

Nav.propTypes = {
	location: object.isRequired,
}



export default Nav;