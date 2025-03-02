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

  public async store({ request, response }: HttpContext) {
    try {
      const { fullName, email, password } = request.body()
      const user = await User.create({
        email: email,
        password: password,
        fullName: fullName,
      })
      return response.json({ message: 'Utilisateur correctement créé', data: user })
    } catch (err) {
      console.error(err)
      return response.json({
        error: "Une erreur s'est produite durant la création de l'utilisateur",
      })
    }
  }

  //public async update({ params, request }: HttpContext) {}

  //public async destroy({ params, response }: HttpContext) {}

  //public async edit({ params }: HttpContext) {}
}
