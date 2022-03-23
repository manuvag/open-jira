import {useReducer} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { EntriesContext, entriesReducer } from "./"

const ENTRIES_INITIAL_STATE = {
	entries : [
		{
			_id: uuidv4(),
			description: 'Pendiente: Lorem ipsum',
			status: 'pending',
			createdAt: Date.now(),
		},
		{
			_id: uuidv4(),
			description: 'En progreso: Lorem ipsum',
			status: 'in-progress',
			createdAt: Date.now() - 1000000,
		},
		{
			_id: uuidv4(),
			description: 'Terminada: Lorem ipsum',
			status: 'finished',
			createdAt: Date.now() - 100000,
		},
	], 
}

export const EntriesProvider = ({ children }) => {

	const [ state, dispatch ] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)
	const addNewEntry = (description) =>{
		const newEntry = {
			_id: uuidv4(),
			description,
			createdAt: Date.now(),
			status: 'pending'
		}

		dispatch({type: '[Entry] Add-Entry', payload: newEntry})
	}
	
	const updateEntry = ( entry ) => {
		dispatch({ type: '[Entry] Updated', payload: entry })
	}


	return (
		<EntriesContext.Provider value={{
			...state,
			addNewEntry,
			updateEntry,
		}}>
			{ children }
		</EntriesContext.Provider>
	)
}
