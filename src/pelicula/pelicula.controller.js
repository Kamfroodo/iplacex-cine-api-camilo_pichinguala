import { getDB } from '../common/db.js'
import { ObjectId } from 'mongodb'
import peliculaSchema from './pelicula.js'

const peliculaCollection = getDB().collection('peliculas')

export const handleInsertPeliculaRequest = async (req, res) => {
  try {

    const camposPermitidos = Object.keys(peliculaSchema).filter(
      (campo) => campo !== 'id' && campo !== '_id'
    )

    const nuevaPelicula = {}
    camposPermitidos.forEach((campo) => {
      nuevaPelicula[campo] = req.body[campo]
    })

    return peliculaCollection
      .insertOne(nuevaPelicula)
      .then((result) => {
        return res.status(201).json({
          success: true,
          message: 'Película agregada correctamente',
          data: { _id: result.insertedId }
        })
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: 'Error al insertar la película',
          error: error.message
        })
      })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al insertar la película',
      error: error.message
    })
  }
}

export const handleGetPeliculasRequest = async (req, res) => {
  return peliculaCollection
    .find({})
    .toArray()
    .then((peliculas) => {
      // Retorna el arreglo directamente, tal como pide la pauta: [ {}, {}, ... ]
      return res.status(200).json(peliculas)
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las películas',
        error: error.message
      })
    })
}

export const handleGetPeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params
    const objectId = new ObjectId(id)

    return peliculaCollection
      .findOne({ _id: objectId })
      .then((pelicula) => {
        if (!pelicula) {
          return res.status(404).json({
            success: false,
            message: 'Película no encontrada'
          })
        }

        return res.status(200).json({
          success: true,
          data: pelicula
        })
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener la película por ID',
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

export const handleUpdatePeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params
    const objectId = new ObjectId(id)
    const updateData = req.body

    return peliculaCollection
      .updateOne({ _id: objectId }, { $set: updateData })
      .then((result) => {
        if (result.matchedCount === 0) {
          return res.status(404).json({
            success: false,
            message: 'Película no encontrada para actualizar'
          })
        }

        return res.status(200).json({
          success: true,
          message: 'Película actualizada correctamente'
        })
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar la película',
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

export const handleDeletePeliculaByIdRequest = async (req, res) => {
  try {
    const { id } = req.params
    const objectId = new ObjectId(id)

    return peliculaCollection
      .deleteOne({ _id: objectId })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.status(404).json({
            success: false,
            message: 'Película no encontrada para eliminar'
          })
        }

        return res.status(200).json({
          success: true,
          message: 'Película eliminada correctamente'
        })
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: 'Error al eliminar la película',
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