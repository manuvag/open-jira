import { useState, useMemo, useContext } from 'react'
import { useRouter } from 'next/router'
import { EntriesContext } from '/context/entries'
import { 
  capitalize, 
  Grid, 
  Card, 
  CardHeader, 
  CardContent, 
  TextField, 
  Button, 
  CardActions, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  IconButton
} from '@mui/material'
import SaveIcon from '@mui/icons-material/SaveOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Layout } from 'components/layouts'
import { dateFunctions } from 'utils'

import { dbEntries } from 'database'
 
const validStatus = ['pending', 'in-progress', 'finished']

const EntryPage = ({ entry }) => {
  
  const router = useRouter()

  const { updateEntry, deleteEntry } = useContext(EntriesContext)
  
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onTextFieldChange = (e) => {
    setInputValue( e.target.value )
  }

  const onStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const onSave = () => {
    if(inputValue.trim().length === 0) return 
    const updatedEntry = {
      ...entry,
      status,
      description: inputValue
    }
    updateEntry(updatedEntry, true)
    router.push('/')
  }

  const onDelete = () =>{
    //deleteEntry(entry._id, true)
  }

  return(
    <Layout title={ inputValue.substring(0,20) + '...'}>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
          <Card>
            <CardHeader
              title={`Entrada:`} 
              subheader={`Creada ${ dateFunctions.getFormatDistanceToNow(entry.createdAt)} `}
            />
            <CardContent>
              <TextField 
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='Nueva entrada'
                autoFocus
                multiline
                label='Nueva Entrada'
                value={ inputValue }
                onChange={ onTextFieldChange }
                helperText={ isNotValid && 'Ingrese un valor'}
                onBlur={()=> setTouched(true)}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup 
                  row
                  value={ status }
                  onChange={onStatusChange}
                >
                  { 
                    validStatus.map(opt => (
                      <FormControlLabel 
                        key={opt}
                        value={ opt }
                        control={ <Radio/> }
                        label={ capitalize(opt) }
                      />
                    )) 
                  }
                </RadioGroup>
              </FormControl>

              <CardActions>
                <Button
                  startIcon={<SaveIcon/>}
                  variant='contained'
                  fullWidth
                  onClick={onSave}
                  disabled={inputValue.length <= 0}
                >
                  Save
                </Button>
              </CardActions>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
      <IconButton sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }} onClick={ onDelete }>
        <DeleteIcon/>
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps = async ({ params }) => {
  
  const { id } = params

  const entry = await dbEntries.getEntryById(id)

  if(!entry){
    return {
      redirect: {
        destination: '/',
        permanent : false
      }
    }
  }
  
  return {
    props : { 
      entry
    }
  }
}

export default EntryPage
