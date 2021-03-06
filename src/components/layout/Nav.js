import React from 'react';
import { object, oneOfType } from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { signIn, signOut } from '../../firebase';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`

const Nav = ({ location, user }) => {

	const { pathname } = location;

	const signInButton = <button onClick={signIn} type="button" className="btn btn-light"><FontAwesomeIcon style={{ marginRight: '6px' }} icon={faGoogle} />Sign in with Google</button>;
	const signOutButton = <button onClick={signOut} type="button" className="btn btn-light"><FontAwesomeIcon style={{ marginRight: '6px' }} icon={faGoogle} />Sign out</button>;

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-primary">
			<Container>
				<div className="left">
					<ul className="navbar-nav">
						<Link className="navbar-brand" to="/">Boilerplate</Link>
						<li className={`nav-item ${pathname === '/' && 'active'}`}>
							<Link className="nav-link" to="/">Preview</Link>
						</li>
						<li className={`nav-item ${pathname === '/snippets' && 'active'}`}>
							<Link className="nav-link" to="/snippets">Snippets</Link>
						</li>
					</ul>
				</div>
				<div className="right">
					{user && Object.keys(user) ? signOutButton : signInButton}
				</div>
			</Container>
		</nav>
	)
}

Nav.propTypes = {
	location: object.isRequired,
	user: object,
}



export default Nav;