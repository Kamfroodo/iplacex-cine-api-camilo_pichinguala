import { Router } from 'express'
import {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest
} from './actor.controller.js'

const ActorRoutes = Router()

ActorRoutes.post('/actor', handleInsertActorRequest)
ActorRoutes.get('/actores', handleGetActoresRequest)
ActorRoutes.get('/actor/pelicula/:idPelicula', handleGetActoresByPeliculaIdRequest)
ActorRoutes.get('/actor/:id', handleGetActorByIdRequest)

export default ActorRoutes