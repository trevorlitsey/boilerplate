import React from 'react';
import Creatable from 'react-select/lib/Creatable';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import styled from 'styled-components';

import 'react-select/dist/react-select.css';

const Span = styled.span`
	cursor: pointer;
`

const createOption = (label: string) => ({
	label,
	value: label.toLowerCase().trim(),
});

class NewSnippetModal extends React.Component {

	state = {
		selectedOptions: [],
		options: [
			{ value: 'ocean', label: 'Ocean', color: '#00B8D9' },
			{ value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
			{ value: 'purple', label: 'Purple', color: '#5243AA' },
			{ value: 'red', label: 'Red', color: '#FF5630' },
			{ value: 'orange', label: 'Orange', color: '#FF8B00' },
			{ value: 'yellow', label: 'Yellow', color: '#FFC400' },
			{ value: 'green', label: 'Green', color: '#36B37E' },
			{ value: 'forest', label: 'Forest', color: '#00875A' },
			{ value: 'slate', label: 'Slate', color: '#253858' },
			{ value: 'silver', label: 'Silver', color: '#666666' },
		],
	}

	handleSelectChange = (selectedOptions) => {
		this.setState({ selectedOptions })
	}

	render() {

		const { modalOn, hideModal } = this.props;
		const { options, selectedOptions } = this.state;


		return (
			<Modal className="show" show={modalOn} onHide={hideModal}>
				<Modal.Header>
					<Modal.Title>New Snippet</Modal.Title>
					<Span onClick={hideModal}>
						<FontAwesomeIcon icon={faTimes} />
					</Span>
				</Modal.Header>
				<Modal.Body>
					<form>
						<div className="form-group">
							<label htmlFor="title">Title:</label>
							<input type="text" className="form-control" placeholder="Intro" />
						</div>
						<div className="form-group">
							<label htmlFor="text">Text:</label>
							<textarea className="form-control" rows="3"></textarea>
						</div>
						<div className="form-group">
							<label htmlFor="tags">Tags:</label>
							<Creatable
								name="tags"
								isClearable
								multi={true}
								closeOnSelect={false}
								onChange={this.handleSelectChange}
								value={selectedOptions}
								options={options}
							/>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={hideModal}>Close</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default NewSnippetModal;