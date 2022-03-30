import { useReducer, useEffect } from 'react'
import { EntriesContext, entriesReducer } from "./"
import { entriesApi } from 'apis'

const ENTRIES_INITIAL_STATE = {
	entries : [], 
}

export const EntriesProvider = ({ children }) => {

	const [ state, dispatch ] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

	const addNewEntry = async (description) =>{
		const { data } = await entriesApi.post('/entries', { description })
		dispatch({type: '[Entry] Add-Entry', payload: data})
	}

	const updateEntry = async ({ _id, description, status }) => {
		try{
			const { data } = await entriesApi.put(`/entries/${_id}`, { description,status })
			dispatch({ type: '[Entry] Updated', payload: data })
		}catch(e){
			console.log(e)
		}
	}

	const refreshEntries = async () => {
		const { data } = await entriesApi.get('/entries')
		dispatch({ type: '[Entry] Refresh', payload: data })
	}

	useEffect(() => {
		refreshEntries()
	}, [])


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
