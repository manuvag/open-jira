import { db } from 'database'
import { Entry } from 'models'

const handler = (req, res) =>{

  switch(req.method){
    case 'PUT':
      return updateEntry(req, res)
    case 'GET':
      return getEntry(req, res)
    case 'DELETE':
      return deleteEntry(req, res)
    default:
      return res.status(400).json({message: 'Metodo no existe'})
  }

}

const getEntry = async (req, res) => {
  const { id } = req.query

  await db.connect() 
  const entry = await Entry.findById(id)
  await db.disconnect()

  if(!entry){
    return res.status(400).json({ message: 'No hay registro con ese ID' })
  }

  res.status(200).json(entry)
}

const deleteEntry = async (req, res) => {
  const { id } = req.query

  await db.connect()
  const entryToDelete = await Entry.findById(id)
  if(!entryToDelete){
    await db.disconnect()
    return res.status(400).json({ message: 'No hay registro con ese ID' })
  }

  try{
    await Entry.findByIdAndDelete(id)
    await db.disconnect()
    return res.status(200).json({ message:'Exito al eliminar'})

  }catch(e){
    await db.disconnect()
    res.status(400).json({message: 'Algo salio mal'})
  }
}


const updateEntry = async (req, res) =>{
  const { id } = req.query

  await db.connect()
  const entryToUpdate = await Entry.findById(id)
  if(!entryToUpdate){
    await db.disconnect()
    return res.status(400).json({message: 'No hay registro con ese ID'})
  }

  const { 
    description = entryToUpdate.description, 
    status = entryToUpdate.status 
  } = req.body

  try{
    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runvalidators: true, new: true })
    await db.disconnect()
    res.status(200).json(updatedEntry)
  }catch(e){
    console.log(e)
    await db.disconnect()
    res.status(400).json({message: 'La conexion fallo'})
  }

}

export default handler
