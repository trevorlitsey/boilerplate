import { reorder, processPreview, generateTextFromDraft } from './helpers';

import { snippets } from '../../sampleData';

it('should reorder preview from drop result in same list', () => {

	const idToMove = 'jgux6edn';

	const preview = {
		snippetOrder: ['jguxf292'],
		draftOrder: [idToMove, 'jghgygc9'],
	}

	const dropResult = {
		draggableId: 'jgux6edn',
		type: 'DEFAULT',
		source: { droppableId: 'draftOrder', index: 0 },
		destination: { droppableId: 'draftOrder', index: 1 },
		reason: 'DROP',
	}

	const reorderedPreview = reorder(preview, dropResult);

	expect(reorderedPreview.draftOrder.indexOf(idToMove)).toBe(1);

})

it('should reorder preview from drop result in different list', () => {

	const idToMove = 'jgux6edn';

	const preview = {
		snippetOrder: ['jguxf292'],
		draftOrder: [idToMove, 'jghgygc9'],
	}

	const dropResult = {
		draggableId: 'jgux6edn',
		type: 'DEFAULT',
		source: { droppableId: 'draftOrder', index: 0 },
		destination: { droppableId: 'snippetOrder', index: 1 },
		reason: 'DROP',
	}

	const reorderedPreview = reorder(preview, dropResult);

	expect(reorderedPreview.snippetOrder.indexOf(idToMove)).toBe(1);

});

it('should process preview', () => {
	const preview = {
		snippetOrder: ['jguxf292'],
		draftOrder: ['jgux6edn', 'jghgygc9'],
	}

	const expectedPreviewOne = {
		'draftOrder': ['jgux6edn', 'jghgygc9'],
		'snippetOrder': ['jguxf292', 'jgxvm7zr'],
	}

	const expectedPreviewTwo = {
		'draftOrder': ['jgux6edn'],
		'snippetOrder': ['jguxf292', 'jgxvm7zr'],
	}

	// guard against empty result from db
	expect(processPreview()).toEqual({ snippetOrder: [], draftOrder: [] })
	expect(processPreview(preview)).toEqual({ snippetOrder: [], draftOrder: [] })

	// add extra snippets to snippetOrder as needed
	expect(processPreview(preview, snippets)).toEqual(expectedPreviewOne);

	// delete extra snippets from snippetOrder as needed
	delete snippets.jghgygc9;
	expect(processPreview(preview, snippets)).toEqual(expectedPreviewTwo);

});

it('generateTextFromDraft should generate .docx text from snippets', () => {
	const snippets = {
		one: {
			title: 'first title',
			text: 'this is the first text'
		},
		two: {
			title: 'second title',
			text: 'this is the second text'
		}
	}
	const draftOrder = ['one', 'two'];

	const text = generateTextFromDraft(snippets, draftOrder);
	expect(text).toBe('this is the first text\n\nthis is the second text\n\n')
})