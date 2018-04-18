import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import ReactTooltip from 'react-tooltip'

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	background: var(--light);
	padding: 10px;
	margin-bottom: 20px;

	& > .card {
		display: grid;
		grid-template-columns: 1fr 3fr;
		align-items: center;
		grid-gap: 6px;
		padding: 8px;
		margin: 2px;

		
	}

	.icon:hover {
		cursor: pointer;
	}

`

const H4 = styled.h3`
	text-decoration: underline;
	margin-bottom: .75rem;
`

const Card = ({ title, content, tags }) => (
	<div className="card">
		<FontAwesomeIcon icon={faPlusSquare} className="icon" />
		<p
			data-tip={content.length > 30 ? content.substring(0, 30) + ' ...' : content}
			className="card-text"
		>
			{title}
		</p>
	</div>
)

class SnippetWell extends React.PureComponent {

	render() {

		const { snippets } = this.props;

		return (
			<div>
				<H4>Snippets</H4>
				<Container className="rounded">
					{snippets.map(snippet => <Card key={snippet.id} {...snippet} />)}
				</Container>
				<ReactTooltip effect="solid" />
			</div>
		)
	}
}

export default SnippetWell;