import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Card, CardContent, CardActions, Typography, CardActionArea } from '@mui/material'
import { UIContext } from 'context/ui'
import { dateFunctions } from 'utils'

export const EntryCard = ({ id, description, created }) => {

	const { startDragging, endDragging } = useContext(UIContext)
	const router = useRouter()

	const onDragStart = (e) => {
		e.dataTransfer.setData('id', id)
		startDragging()
	}

	const onDragEnd = () => {
		endDragging()	
	}

	const onClick = () =>{
		router.push(`/entries/${id}`)
	}

	return (
		<Card sx={{ marginBottom: 1}} draggable onDragStart={onDragStart} onDragEnd={onDragEnd} onClick={ onClick }>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>{ description }</Typography>
				</CardContent>
				<CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2  }}>
					<Typography variant='body2'>{ 
						dateFunctions.getFormatDistanceToNow(created) 
					}</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	)
}
