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
		selectedTags: this.props.snippetToEdit.selectedTags || [],
		alertText: '',
	}

	handleSelectChange = (selectedTags) => {
		this.setState({ selectedTags })
	}

	handleSelectCreate = (newTag) => {
		const selectedTags = [...this.state.selectedTags];
		delete newTag.className;
		selectedTags.push(newTag);
		this.setState({ selectedTags });
		this.props.addTag(newTag);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { title, text } = this.refs;
		if (!title.value || !text.value) {
			return this.setState({ alertText: 'please provide a title and text!' });
		}

		const snippet = {
			title: title.value,
			text: text.value,
			tags: this.state.selectedTags,
		}

		// add or update
		if (this.props.snippetToEdit) {
			this.props.updateSnippet(snippet)
		} else {
			this.props.addSnippet(snippet)
		}

		this.clearForm();
		this.props.hideModal();
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

		const { modalOn, hideModal, tags, snippetToEdit } = this.props;
		const { selectedTags, alertText } = { ...this.state };

		const options = Object.values(tags).map(val => val);

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
							<input ref="title" type="text" className="form-control" defaultValue={snippetToEdit && snippetToEdit.title} placeholder="Intro" />
						</div>
						<div className="form-group">
							<label htmlFor="text">Text:</label>
							<textarea ref="text" className="form-control" rows="3" defaultValue={snippetToEdit && snippetToEdit.text} placeholder="We the People of the United States, in Order to form a more perfect Union ..."></textarea>
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
								value={selectedTags}
								options={options}
							/>
						</div>
					</Modal.Body>
					<Modal.Footer style={{ justifyContent: 'space-between' }}>
						<button className="btn btn-danger" style={{ justifySelf: 'flex-start' }}>Delete</button>
						<div>
							<button type="submit" className="btn btn-primary">{snippetToEdit ? 'Update' : 'Submit'}</button>
							<Button onClick={hideModal}>Cancel</Button>
						</div>
					</Modal.Footer>
				</form>
			</Modal>
		)
	}
}

export default NewSnippetModal;