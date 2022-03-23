import { useContext } from 'react'

import { Box, Drawer, List, Typography, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'

import { UIContext } from 'context/ui/UIContext'

const menuItems = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {
	
	const { sidemenuOpen, closeSideMenu } = useContext( UIContext )
	
	return (
		<Drawer
			anchor='left'
			open={ sidemenuOpen }
			onClose={ closeSideMenu }
		>
			<Box sx={{ width: 250 }}>
				<Box sx={{ padding: '5px 10px' }}>
					<Typography variant='h4'>Menu</Typography>
				</Box>
				<List>
					{ menuItems.map(( text, i ) => (
						<ListItem button key={ text }>
							<ListItemIcon>
								{ i % 2 ? <InboxOutlinedIcon/> : <MailOutlinedIcon/>	}
							</ListItemIcon>
							<ListItemText primary={ text }/>
						</ListItem>)
					)}				
				</List>

				<Divider/>

			</Box>
		</Drawer>
	)
}
