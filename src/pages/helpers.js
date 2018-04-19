export const reorder = ({ ...preview }, dropResult) => {

	const { source, destination } = dropResult;

	const [itemToMove] = preview[source.droppableId].splice(source.index, 1);
	preview[destination.droppableId].splice(destination.index, 0, itemToMove);

	return preview;
}