export const processPreview = (preview, snippets = {}) => {

	if (!preview) {
		preview = { snippetOrder: [], draftOrder: [] }
	}

	const { snippetOrder, draftOrder } = { ...preview };

	Object.keys(snippets).forEach((key) => {
		if (!snippetOrder.includes(key) && !draftOrder.includes(key)) {
			snippetOrder.push(key);
		}
	})

	return { snippetOrder, draftOrder };
}