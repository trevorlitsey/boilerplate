import { generateTextFromDraft } from './helpers';

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