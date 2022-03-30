import { db } from 'database'
import { Entry } from 'models'

const handler = (req, res) => {
  switch(req.method){
    case 'GET':
      return getEntries( res )
    case 'POST':
      return postEntry(req, res)
    default:
      return res.status(400).json({message: 'Endpoint no existe'})
  }
}

const getEntries = async (res) =>{

  await db.connect()
  const entries = await Entry.find().sort({ createdAt: 'ascending' })
  await db.disconnect()

  res.status(200).json(entries) 
}

const postEntry = async (req, res) =>{
  const { description = '' } = req.body
  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  })

  try{
    await db.connect()
    await newEntry.save()
    await db.disconnect()
    return res.status(201).json(newEntry)
  }catch(e){
    await db.disconnect()
    console.log(e)
    res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' })
  }

  return res.status(201).json({message: 'POST creado'})
}

export default handler
