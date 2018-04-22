const grid = 6;

const baseItemStyle = {
	userSelect: 'none',
	padding: grid * 2,
	lineHeight: 1,
}

const getBaseListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'var(--gray)' : 'var(--light)',
	padding: grid,
	transition: 'all .3s',
	border: '1px solid rgba(0,0,0,.1)',
})


// -----exports-----
export const getPreviewItemStyle = (isDragging, isActive, draggableStyle) => ({
	...baseItemStyle,
	margin: `0 0 ${grid}px 0`,
	background: isActive ? 'var(--primary)' : '',
	color: isActive ? 'var(--white)' : '',

	...draggableStyle,
});

export const getPreviewListStyle = (isDraggingOver) => ({
	...getBaseListStyle(isDraggingOver),
	minWidth: 250,
});

export const getSnippetItemStyle = (isDragging, draggableStyle) => ({
	...baseItemStyle,
	margin: `0 ${grid}px 0 0`,
	minWidth: 100,
	textAlign: 'center',
	display: 'inline-block',

	...draggableStyle,
});

export const getSnippetListStyle = (isDraggingOver) => ({
	...getBaseListStyle(isDraggingOver),
	display: 'flex',
	overflow: 'scroll',
	marginBottom: 20,
});