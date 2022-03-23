import { useContext, useMemo } from 'react'
import { Paper, List } from '@mui/material'
import { EntriesContext } from 'context/entries'
import { UIContext } from 'context/ui'

import { EntryCard } from './'

import styles from './EntryList.module.css'

export const EntryList = ({ status }) => {

	const { entries, updateEntry } = useContext(EntriesContext)
	const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries] )
	const { isDragging, endDragging } = useContext(UIContext)
	const allowDrop = e => {
		e.preventDefault()
	}
	const onDropEntry = e => {
		const id = e.dataTransfer.getData('id')
		const entry = entries.find(e => e._id === id)
		entry.status = status
		updateEntry(entry)
		endDragging()
	}

	return ( 
		<div 
			onDrop={ onDropEntry }
			onDragOver={ allowDrop }
			className={isDragging ? styles.dragging : ''}
		>
			<Paper sx={{ 
				height: 'calc(100vh - 250px)', 
				overflow: 'scroll', 
				backgroundColor: 'transparent',
				padding: '2px 8px'
			}}>
				<List sx={{
					opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s'
				}}>
					{ entriesByStatus.map(entry => (
						<EntryCard 
							key={entry._id} 
							id={entry._id}
							description={entry.description} 
							created={entry.createdAt}/>
					)
					) }
				</List>
			</Paper>

		</div>
	)
}
