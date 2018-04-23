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

class NewSnippetModal extends React.Component {

	state = {
		selectedOptions: [],
		alertText: '',
	}

	handleSelectChange = (selectedOptions) => {
		this.setState({ selectedOptions })
	}

	handleSelectCreate = (newTag) => {
		const selectedOptions = [...this.state.selectedOptions];
		delete newTag.className;
		selectedOptions.push(newTag);
		this.setState({ selectedOptions });
		this.props.addTag(newTag);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { title, text } = this.refs;
		if (!title.value || !text.value) {
			return this.setState({ alertText: 'please provide a title and text!' });
		}

		// TODO make firestore call
		this.clearForm();
	}

	clearForm = () => {
		this.setState({
			selectedOptions: [],
			alertText: '',
		})
		this.refs.title.value = '';
		this.refs.text.value = '';
	}

	render() {

		const { modalOn, hideModal, tags } = this.props;
		const { options, selectedOptions, alertText } = { ...this.state };


		return (
			<Modal className="show" show={modalOn} onHide={hideModal}>
				<form onSubmit={this.handleSubmit}>
					<Modal.Header>
						<Modal.Title>New Snippet</Modal.Title>
						<Span onClick={hideModal}>
							<FontAwesomeIcon icon={faTimes} />
						</Span>
					</Modal.Header>
					<Modal.Body>
						<div className="alert alert-danger" style={{ display: alertText ? 'block' : 'none' }} role="alert">
							{alertText}
							<button type="button" className="close" onClick={() => this.setState({ alertText: '' })}>
								<span>&times;</span>
							</button>
						</div>
						<div className="form-group">
							<label htmlFor="title">Title:</label>
							<input ref="title" type="text" className="form-control" placeholder="Intro" />
						</div>
						<div className="form-group">
							<label htmlFor="text">Text:</label>
							<textarea ref="text" className="form-control" rows="3" placeholder="We the People of the United States, in Order to form a more perfect Union ..."></textarea>
						</div>
						<div className="form-group">
							<label htmlFor="tags">Tags:</label>
							<Creatable
								name="tags"
								isClearable
								multi={true}
								closeOnSelect={false}
								onChange={this.handleSelectChange}
								onNewOptionClick={this.handleSelectCreate}
								value={selectedOptions}
								options={tags}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<button type="submit" className="btn btn-primary">Submit</button>
						<Button onClick={hideModal}>Clear</Button>
					</Modal.Footer>
				</form>
			</Modal>
		)
	}
}

export default NewSnippetModal;