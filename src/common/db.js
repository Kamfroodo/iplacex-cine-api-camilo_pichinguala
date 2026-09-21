import { MongoClient } from 'mongodb'
import 'dotenv/config'

const mongoUri = process.env.MONGODB_URI

if (!mongoUri) {
  console.error('Error: no se encontró la variable MONGODB_URI. Debes configurar la cadena de conexión de Atlas.')
  process.exit(1)
}

const client = new MongoClient(mongoUri, {
  serverSelectionTimeoutMS: 5000,
  appName: 'eva-u3-express'
})

export const connectDB = async () => {
  try {
    await client.connect()
    console.log('Conexión a Atlas exitosa.')
    return client
  } catch (error) {
    console.error('Error al conectar con Atlas:', error.message)
    throw error
  }
}

export const getDB = () => client.db('cine-db')