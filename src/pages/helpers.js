export const reorder = ({ ...preview }, dropResult) => {
	const { source, destination } = dropResult;

	const [itemToMove] = preview[source.droppableId].splice(source.index, 1);
	preview[destination.droppableId].splice(destination.index, 0, itemToMove);

	return preview;
}

export const processPreview = (preview, snippets) => {

	const { snippetOrder, draftOrder } = { ...preview };

	Object.keys(snippets).forEach((key) => {
		if (!snippetOrder.includes(key) && !draftOrder.includes(key)) {
			snippetOrder.push(key);
		}
	})

	return { snippetOrder, draftOrder };
}