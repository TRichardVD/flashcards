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
  //async create({ view }: HttpContext) {}

  //async store({ request }: HttpContext) {}

  //async edit({ params }: HttpContext) {}

  //async update({ params, request }: HttpContext) {}

  //async destroy({ params, response }: HttpContext) {}
}
