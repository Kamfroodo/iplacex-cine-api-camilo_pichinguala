import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './src/common/db.js'
import actorRouter from './src/actor/routes.js'
import peliculaRouter from './src/pelicula/routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', (req, res, next) => {
  console.log(`Ruta API solicitada: ${req.method} ${req.originalUrl}`)
  next()
})

app.get('/', (req, res) => {
  res.status(200).send('Bienvenido al cine Iplacex')
})

app.use('/api', actorRouter)
app.use('/api', peliculaRouter)

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Servidor Express corriendo en http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('No se pudo iniciar el servidor porque falló la conexión a Atlas:', error.message)
    process.exit(1)
  }
}

startServer()