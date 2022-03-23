import '../styles/globals.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { darkTheme } from 'themes'
import { UIProvider } from 'context/ui'
import { EntriesProvider } from 'context/entries'

function MyApp({ Component, pageProps }) {
  return (
    <UIProvider>
      <EntriesProvider>
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
      </EntriesProvider>
    </UIProvider>
  )
}

export default MyApp
