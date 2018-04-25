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

// thnx https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
export const downloadDocument = (filename, text) => {
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}