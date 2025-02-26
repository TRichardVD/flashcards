import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  public async index({ response }: HttpContext) {
    const decks = await Deck.query().orderBy('id', 'asc')
    return response.send(decks)
  }
  public async show({ response, params }: HttpContext) {
    return response.send(await Deck.find(params.id))
  }
  //public async create({ view }: HttpContext) {}

  //public async store({ request }: HttpContext) {}

  //public async create({ view }: HttpContext) {}

  //public async store({ request }: HttpContext) {}

  //public async update({ params, request }: HttpContext) {}

  //public async destroy({ params, response }: HttpContext) {}

  //public async edit({ params }: HttpContext) {}
}
