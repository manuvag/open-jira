import { useContext, useState } from "react"

import { Button, Box, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/SaveOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutlined'

import { EntriesContext } from 'context/entries'
import { UIContext } from "context/ui"

export const NewEntry = () => {

	const { addNewEntry } = useContext(EntriesContext)
	const { setIsAddingEntry, isAddingEntry } = useContext(UIContext)
	const [inputValue, setInputValue] = useState('')
	const [touched, setTouched] = useState(false)

	const onTextChanges = (e) => {
		setInputValue(e.target.value)
	}

	const onSave = () => {
		if(inputValue.length === 0) return
		addNewEntry(inputValue)
		setIsAddingEntry(false)
		setTouched(false)
		setInputValue('')
	}

	return (
		<Box sx={{ marginBottom: 2 }}>
			{ isAddingEntry ? ( <>

				<TextField 
					fullWidth
					placeholder='Nueva Entrada'
					autoFocus
					multiline
					label='Nueva Entrada'
					helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor'}
					error={ inputValue.length <= 0 && touched}
					value={ inputValue }
					onChange={ onTextChanges }
					onBlur={ () => setTouched(true) }
					sx={{ marginTop: 2, marginBottom: 1}}/>
				<Box display='flex' justifyContent='space-between'>
					<Button variant='text' onClick={() => setIsAddingEntry(false)}>Cancelar</Button>
					<Button 
						variant='outlined' 
						color='secondary' 
						endIcon={<SaveIcon/>} 
						onClick={ onSave }
					>
						Guardar
					</Button>
				</Box>
			</>)
			:( 
				<Button
					startIcon={ <AddIcon/> }
					fullWidth
					variant='outlined'
					onClick={()=> setIsAddingEntry(true)}
				>
					Agregar tarea
				</Button>
			)}
		</Box>
	)
}
