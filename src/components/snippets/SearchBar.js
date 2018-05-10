import React from 'react';
import { func } from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import styled from 'styled-components';

const Wrapper = styled.div`
	float: right;
	max-width: 300px;
	margin-bottom: 10px;

	input {
		border-right: none;
	}

	.input-group-text {
		background: none;
		color: HSLA(206, 7%, 45%, .8);
	}

`

const SearchBar = ({ onChange }) => (
	<Wrapper>
		<div className="input-group mb-3">
			<input
				onChange={onChange}
				data-test="search"
				type="text"
				className="form-control"
				placeholder="Search ..."
			/>
			<div className="input-group-append">
				<span className="input-group-text" id="basic-addon2"><FontAwesomeIcon icon={faSearch} /></span>
			</div>
		</div>
	</Wrapper>
)

SearchBar.propTypes = {
	onChange: func.isRequired,
}

export default SearchBar;