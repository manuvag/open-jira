import { useContext } from 'react'
import { Card, CardContent, CardActions, Typography, CardActionArea } from '@mui/material'
import { UIContext } from 'context/ui'

export const EntryCard = ({ id, description, created }) => {

	const { startDragging, endDragging } = useContext(UIContext)
	const onDragStart = (e) => {
		e.dataTransfer.setData('id', id)
		startDragging()
	}

	const onDragEnd = () => {
		endDragging()	
	}

	return (
		<Card sx={{ marginBottom: 1}} draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>{ description }</Typography>
				</CardContent>
				<CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2  }}>
					<Typography variant='body2'>{ created }</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	)
}
