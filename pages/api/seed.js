import { db, seedData } from 'database'
import { Entry } from 'models'

export default async function handler(req, res){
  if(process.env.NODE_ENV === 'production'){
    return res.status(401).json({ message: 'No tiene acceso a este servicio' })
  }

  await db.connect()

  await Entry.deleteMany()
  await Entry.insertMany(seedData.entries)

  await db.disconnect()

  res.status(200).json({ message: 'Proceso realizado correctamente' })
}
