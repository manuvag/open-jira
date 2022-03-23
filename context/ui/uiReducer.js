export const uiReducer = ( state , action) => {
	switch(action.type){
		case 'UI - Open Sidebar':
			return {
				...state,
				sidemenuOpen: true
			}
		case 'UI - Close Sidebar':
			return {
				...state,
				sidemenuOpen: false
			}
		case 'UI - Set isAddingEntry':
			return{
				...state,
				isAddingEntry: action.payload
			}
		case 'UI - Start Dragging':
			return {
				...state,
				isDragging: true,
			}
		case 'UI - End Dragging':
			return {
				...state,
				isDragging: false
			}
		default:
			return state
	}
}
