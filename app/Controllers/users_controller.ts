import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async index({ response }: HttpContext) {
    try {
      const users = await User.query().orderBy('id', 'asc')
      return response.send(users)
    } catch (err) {
      console.error('Erreur dans la récupération des utilisateurs', err)
    }
  }

  async show({ params }: HttpContext) {
    return await User.find(params.id)
  }

  //async create({ view }: HttpContext) {}

  //async store({ request }: HttpContext) {}

  //async edit({ params }: HttpContext) {}

  //async update({ params, request }: HttpContext) {}

  //async destroy({ params, response }: HttpContext) {}
}
