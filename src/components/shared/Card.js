import React from 'react';
import { string, object, bool } from 'prop-types';
import { Link } from 'react-router-dom';

const grid = 8;

const getStyles = (overrideStyles, isActive) => ({
	userSelect: 'none',
	padding: grid * 2,
	lineHeight: 1,
	margin: `0 0 ${grid}px ${grid}px`,
	background: isActive ? 'var(--primary)' : '',
	color: isActive ? 'var(--white)' : '',

	...overrideStyles,
})

const Tag = ({ value }) => (
	<span className="badge badge-light">{value}</span>
)

const Card = ({ title, text, tags, id, overrideStyles, isActive, showModal }) => (
	<div className="card" style={getStyles(overrideStyles, isActive)}>
		<h5 className="card-title">{title}</h5>
		<p className="card-text">{text.length > 80 ? text.substring(0, 80) + ' ...' : text}</p>
		<div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
			<Link to="#" style={{ marginRight: 12, marginTop: 'auto' }} onClick={() => showModal(id)}>edit</Link>
			<div>
				{tags && tags.map(tag => <Tag key={tag.id} value={tag.value} />)}
			</div>
		</div>
	</div>
)

Card.propTypes = {
	title: string.isRequired,
	text: string.isRequired,
	overrideStyles: object,
	isActive: bool,
}

export default Card;