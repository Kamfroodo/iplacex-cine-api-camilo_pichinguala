import { getDB } from '../common/db.js'
import { ObjectId } from 'mongodb'
import actorSchema from './actor.js'

const actorCollection = getDB().collection('actores')

export const handleInsertActorRequest = async (req, res) => {
  try {
    const { idPelicula, nombre, edad, estaRetirado, premios } = req.body

    if (!idPelicula || !nombre || edad === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos requeridos para crear el actor'
      })
    }

    const peliculaCollection = getDB().collection('peliculas')
    const peliculaExistente = await peliculaCollection.findOne({ _id: new ObjectId(idPelicula) })

    if (!peliculaExistente) {
      return res.status(404).json({
        success: false,
        message: 'La película indicada no existe'
      })
    }

    const camposPermitidos = Object.keys(actorSchema).filter(
      (campo) => campo !== 'id' && campo !== '_id'
    )

    const datosRecibidos = {
      idPelicula,
      nombre,
      edad,
      estaRetirado: Boolean(estaRetirado),
      premios: premios || []
    }

    const actor = {}
    camposPermitidos.forEach((campo) => {
      actor[campo] = datosRecibidos[campo]
    })

    return actorCollection
      .insertOne(actor)
      .then((result) => {
        return res.status(201).json({
          success: true,
          message: 'Actor agregado correctamente',
          data: { _id: result.insertedId }
        })
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: 'Error al insertar el actor',
          error: error.message
        })
      })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al insertar el actor',
      error: error.message
    })
  }
}

export const handleGetActoresRequest = async (req, res) => {
  return actorCollection
    .find({})
    .toArray()
    .then((actores) => {
      // Retorna el arreglo directamente, tal como pide la pauta: [ {}, {}, ... ]
      return res.status(200).json(actores)
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los actores',
        error: error.message
      })
    })
}

export const handleGetActorByIdRequest = async (req, res) => {
  try {
    const { id } = req.params
    const objectId = new ObjectId(id)

    return actorCollection
      .findOne({ _id: objectId })
      .then((actor) => {
        if (!actor) {
          return res.status(404).json({
            success: false,
            message: 'Actor no encontrado'
          })
        }

        return res.status(200).json({
          success: true,
          data: actor
        })
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener el actor por ID',
          error: error.message
        })
      })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'ID de actor inválido',
      error: error.message
    })
  }
}

export const handleGetActoresByPeliculaIdRequest = async (req, res) => {
  try {
    const { idPelicula } = req.params
    const objectId = new ObjectId(idPelicula)

    return actorCollection
      .find({ idPelicula: objectId.toString() })
      .toArray()
      .then((actores) => {
        return res.status(200).json({
          success: true,
          data: actores
        })
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener los actores por película',
          error: error.message
        })
      })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'ID de película inválido',
      error: error.message
    })
  }
}