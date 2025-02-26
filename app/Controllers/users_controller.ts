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

  //public async create({ view }: HttpContext) {}

  //public async store({ request }: HttpContext) {}

  //public async create({ view }: HttpContext) {}

  //public async store({ request }: HttpContext) {}

  //public async update({ params, request }: HttpContext) {}

  //public async destroy({ params, response }: HttpContext) {}

  //public async edit({ params }: HttpContext) {}
}
