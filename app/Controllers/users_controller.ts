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

  async show({ params, response }: HttpContext) {
    return response.send(await User.find(params.id))
  }

  //async create({ view }: HttpContext) {}

  //async store({ request }: HttpContext) {}
  //async create({ view }: HttpContext) {}

  //async store({ request }: HttpContext) {}

  //async edit({ params }: HttpContext) {}

  //async update({ params, request }: HttpContext) {}

  //async destroy({ params, response }: HttpContext) {}
  //async edit({ params }: HttpContext) {}

  //async update({ params, request }: HttpContext) {}

  //async destroy({ params, response }: HttpContext) {}
}
