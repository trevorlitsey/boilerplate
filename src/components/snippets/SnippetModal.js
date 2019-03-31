import React from 'react';
import { object, func, bool, array } from 'prop-types';
import Creatable from 'react-select/lib/Creatable';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import styled from 'styled-components';

import 'react-select/dist/react-select.css';

const Span = styled.span`
	cursor: pointer;
`

class SnippetModal extends React.PureComponent {

	static propTypes = {
		snippetToEdit: object.isRequired,
		modalOn: bool.isRequired,
		hideModal: func.isRequired,
		tags: array.isRequired,
		addTag: func.isRequired,
		addSnippet: func.isRequired,
		updateSnippet: func.isRequired,
	}

	static getDerivedStateFromProps(nextProps, prevState) {

		if (nextProps.modalOn && prevState.modalOn) return null

		return ({
			selectedTags: nextProps.snippetToEdit.tags || [],
			alertText: '',
			modalOn: nextProps.modalOn,
		})
	}

	state = {
		selectedTags: [],
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

	handleDelete = () => {
		this.props.deleteSnippet(this.props.snippetToEdit.id)
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
		Object.keys(this.props.snippetToEdit).length > 0
			? this.props.updateSnippet(snippet)
			: this.props.addSnippet(snippet)

		this.clearForm();
		this.props.hideModal();
	}

	clearForm = () => {
		this.setState({
			selectedTags: [],
			alertText: '',
		})
		this.refs.title.value = '';
		this.refs.text.value = '';
	}

	render() {

		const { modalOn, hideModal, tags, snippetToEdit, deleteSnippet } = this.props;
		const { selectedTags, alertText } = { ...this.state };

		const isUpdate = Object.keys(snippetToEdit).length > 0;
		const options = Object.values(tags).map(val => val);

		const deleteButton = <button onClick={this.handleDelete} className="btn btn-danger" style={{ justifySelf: 'flex-start' }}>Delete</button>

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
							<input
								ref="title"
								data-test="title"
								type="text"
								className="form-control"
								defaultValue={snippetToEdit && snippetToEdit.title}
								placeholder="Intro"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="text">Text:</label>
							<textarea
								ref="text"
								data-test="text"
								className="form-control"
								rows="3"
								defaultValue={snippetToEdit && snippetToEdit.text}
								placeholder="Once upon a time ..."
							>
							</textarea>
						</div>
						<div className="form-group">
							<label htmlFor="tags">Tags:</label>
							<Creatable
								name="tags"
								id="tags"
								data-test="tags"
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
					<Modal.Footer className="footer">
						<div className="submit-buttons">
							<button type="submit" className="btn btn-primary">{isUpdate ? 'Update' : 'Submit'}</button>
							<Button onClick={hideModal}>Cancel</Button>
						</div>
						{isUpdate && deleteButton}
					</Modal.Footer>
				</form>
				<style jsx>{`

					.footer {
						display: grid;
						grid-template-areas: 'left right';
						justify-content: space-between;
					}
					
					.submit-buttons {
						grid-area: right;
					}
					
					.btn-danger {
						grid-area: left;
					}

				`}</style>
			</Modal>
		)
	}
}

export default SnippetModal;