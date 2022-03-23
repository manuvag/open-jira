import { useReducer } from "react"
import { UIContext, uiReducer } from "./"

const UI_INITIAL_STATE = {
	sidemenuOpen : false,
	isAddingEntry: false,
	isDragging: false
}

export const UIProvider = ({ children }) => {

	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

	const openSideMenu = () => {
		dispatch({ type: 'UI - Open Sidebar' })
	}

	const closeSideMenu = () => {
		dispatch({ type: 'UI - Close Sidebar' })
	}

	const setIsAddingEntry = (isAdding) => {
		dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding })
	}

	const startDragging = () => {
		dispatch({ type: 'UI - Start Dragging' })	
	}

	const endDragging = () => {
		dispatch({type: 'UI - End Dragging'})	
	}

	return (
		<UIContext.Provider value={{ 
			...state, 
			openSideMenu, 
			closeSideMenu, 
			setIsAddingEntry, 
			startDragging, 
			endDragging 
		}}>
			{children}
		</UIContext.Provider>
	)
}
