export const reorder = ({ ...preview }, dropResult) => {
	const { source, destination } = dropResult;

	const [itemToMove] = preview[source.droppableId].splice(source.index, 1);
	preview[destination.droppableId].splice(destination.index, 0, itemToMove);

	return preview;
}

export const processPreview = (preview, snippets = {}) => {

	if (!preview) {
		preview = { snippetOrder: [], draftOrder: [] }
	}

	// remove dead order ids
	const snippetOrder = preview.snippetOrder.filter(snippet => snippets[snippet])
	const draftOrder = preview.draftOrder.filter(snippet => snippets[snippet])

	Object.keys(snippets).forEach((key) => {
		if (!snippetOrder.includes(key) && !draftOrder.includes(key)) {
			snippetOrder.push(key);
		}
	})

	return { snippetOrder, draftOrder };
}

export const generateTextFromDraft = (snippets, draftOrder) => {
	const text = draftOrder.reduce((text, snippetId) => {
		return text += snippets[snippetId].text + '\n\n';
	}, '')
	return text;
}

export const setPreviewStateFromFirebaseDoc = (that, doc) => {
	const { preview, snippets } = doc.data();
	const { snippetOrder, draftOrder } = processPreview(preview, snippets);

	const state = {
		...doc.data(),
		preview: {
			snippetOrder: snippetOrder || [],
			draftOrder: draftOrder || [],
		}
	}
	that.setState(state);
	that.setState({ dbLoaded: true })
}