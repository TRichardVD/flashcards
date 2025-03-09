import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerUserValidator } from '#validators/user'
import Deck from '#models/deck'

export default class UsersController {
  async index({ response }: HttpContext) {
    try {
      const users = await User.query().orderBy('id', 'asc')
      return response.send(users)
    } catch (err) {
      console.error('Erreur dans la récupération des utilisateurs', err)
    }
  }

  async show({ params, response, session, view }: HttpContext) {
    // Vérification du paramètre id
    if (!params.id || isNaN(params.id)) {
      session.flash('error', "ID de l'utilisateur invalide")
      return response.redirect().toRoute('home')
    }

    const user = await this.getUserPublicData(params.id)

    if (!user) {
      session.flash('error', 'Utilisateur introuvable')
      return response.redirect().toRoute('home')
    }

    // Récupération des decks de l'utilisateur
    const decks = await this.getDecks(user.id)

    const data = { ...user, decks }
    console.log('data', data)

    return view.render('pages/Users/show', {
      user: { ...data },
    })
  }

  //public async create({ view }: HttpContext) {}

  public async store({ request, response, session }: HttpContext) {
    // Validation des données
    const data = await request.validateUsing(registerUserValidator)
    try {
      const { fullName, email, password } = data
      await User.create({
        email: email,
        password: password,
        fullName: fullName,
      })

      session.flash('success', 'Utilisateur créer avec succès')

      return response.redirect().toRoute('home')
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

  private async getDecks(userId: number) {
    const decks = await Deck.query().where('user_fk', userId).orderBy('id', 'asc')
    return decks
  }

  private async getUserPublicData(userId: number) {
    const user = await User.query().where('id', userId).select(['id', 'fullName']).first()
    return user?.$original
  }
}
