import { Router } from 'express'
import {
  handleInsertPeliculaRequest,
  handleGetPeliculasRequest,
  handleGetPeliculaByIdRequest,
  handleUpdatePeliculaByIdRequest,
  handleDeletePeliculaByIdRequest
} from './pelicula.controller.js'

const peliculaRoutes = Router()

peliculaRoutes.post('/pelicula', handleInsertPeliculaRequest)
peliculaRoutes.get('/peliculas', handleGetPeliculasRequest)
peliculaRoutes.get('/película/:id', handleGetPeliculaByIdRequest)
peliculaRoutes.put('/película/:id', handleUpdatePeliculaByIdRequest)
peliculaRoutes.delete('/película/:id', handleDeletePeliculaByIdRequest)

export default peliculaRoutes