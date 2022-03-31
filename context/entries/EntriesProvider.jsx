import { useReducer, useEffect } from 'react'
import { EntriesContext, entriesReducer } from "./"
import { entriesApi } from 'apis'
import { useSnackbar } from 'notistack'

const ENTRIES_INITIAL_STATE = {
	entries : [], 
}

export const EntriesProvider = ({ children }) => {

	const [ state, dispatch ] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)
	const { enqueueSnackbar } = useSnackbar()

	const addNewEntry = async (description) =>{
		const { data } = await entriesApi.post('/entries', { description })
		dispatch({type: '[Entry] Add-Entry', payload: data})
	}

	const deleteEntry = async (id , showSnackbar = false) => {
		try{
			const { data } = await entriesApi.delete(`/entries/${id}`)
			dispatch({ type : '[Entry] Delete', payload: data })
			if(showSnackbar){
				enqueueSnackbar('Entrada eliminada',{
					variant: 'success',
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					}
				})
			}

		}catch(e){
			console.log(e)
		}
	}

	const updateEntry = async ({ _id, description, status }, showSnackbar = false) => {
		try{
			const { data } = await entriesApi.put(`/entries/${_id}`, { description,status })
			dispatch({ type: '[Entry] Updated', payload: data })
			if(showSnackbar){
				enqueueSnackbar('Entrada actualizada',{
					variant: 'success',
					autoHideDuration: 1500,
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right'
					}
				})
			}
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
			deleteEntry
		}}>
			{ children }
		</EntriesContext.Provider>
	)
}
