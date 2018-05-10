import React from 'react';
import { string, object, bool, array, func } from 'prop-types';
import { Link } from 'react-router-dom';

const grid = 8;

const styles = {
	userSelect: 'none',
	padding: grid * 2,
	lineHeight: 1,
}

export const Tag = ({ value }) => (
	<span className="badge badge-light">{value}</span>
)

const Card = ({ title, text, tags, id, showModal }) => (
	<div className="card" style={styles}>
		<h5 className="card-title">{title}</h5>
		<p className="card-text">{text.length > 80 ? text.substring(0, 80) + ' ...' : text}</p>
		<div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
			<a href="#" style={{ marginRight: 12, marginTop: 'auto' }} onClick={() => showModal(null, id)}>edit</a>
			<div>
				{tags && tags.map(tag => <Tag key={tag.id} value={tag.value} />)}
			</div>
		</div>
	</div>
)

Card.propTypes = {
	title: string.isRequired,
	text: string.isRequired,
	tags: array,
	id: string.isRequired,
	showModal: func.isRequired,
}

export default Card;