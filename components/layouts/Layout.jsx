import Head from 'next/head'
import { Box } from '@mui/material'
import { Navbar, Sidebar } from 'components/ui'


export const Layout = ({ title = 'Open Jira App', children }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Head>
				<title>{ title }</title>
			</Head>

			<Navbar/>
			<Sidebar/>

			<Box sx={{ padding: '10px 20px' }}>
				{children}
			</Box>	
		</Box>
	)
}
