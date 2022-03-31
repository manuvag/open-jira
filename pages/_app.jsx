import '../styles/globals.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { darkTheme } from 'themes'
import { UIProvider } from 'context/ui'
import { EntriesProvider } from 'context/entries'
import { SnackbarProvider } from 'notistack'

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider max={ 3 }>
    <UIProvider>
      <EntriesProvider>
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
      </EntriesProvider>
    </UIProvider>
    </SnackbarProvider>
  )
}

export default MyApp
