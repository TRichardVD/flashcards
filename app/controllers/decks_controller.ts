import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  public async index({ response }: HttpContext) {
    try {
      const decks = await Deck.query().orderBy('id', 'asc')
      return response.send(decks)
    } catch (err) {
      return response.send('Erreur')
    }
  }
  public async show({ response, params }: HttpContext) {
    try {
      return response.send(await Deck.find(params.id))
    } catch (err) {
      return response.send('Erreur')
    }
  }

  // public async create({ view }: HttpContext) {}

  public async store({ request, response }: HttpContext) {
    try {
      const { name } = request.body()
      const deck = await Deck.create({ name: name, user_id: 1 })
      return response.json({ message: 'Nouveau deck créé', data: deck })
    } catch (err) {
      return response.json({ error: "Une erreur s'est produite durant la création du deck" })
    }
  }

  // public async update({ params, request }: HttpContext) {}

  // public async destroy({ params, response }: HttpContext) {}

  // public async edit({ params }: HttpContext) {}
}
