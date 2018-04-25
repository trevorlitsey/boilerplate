const grid = 6;

const baseItemStyle = {
	userSelect: 'none',
	padding: grid * 2,
	lineHeight: 1,
}

const getBaseListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'var(--gray)' : 'var(--light)',
	border: '1px solid rgba(0,0,0,.1)',
	padding: grid,
	transition: 'all .3s',
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
	height: 'auto',
});

export const getSnippetListStyle = (isDraggingOver) => ({
	...getBaseListStyle(isDraggingOver),
	display: 'flex',
	marginBottom: 20,
	minHeight: 56,
	whiteSpace: 'nowrap',
	overflow: 'auto'
});

export const getSnippetItemStyle = (isDragging, draggableStyle) => ({
	...baseItemStyle,
	margin: `0 ${grid}px 0 0`,
	minWidth: 100,
	textAlign: 'center',
	display: 'inline-block',

	...draggableStyle,
});
