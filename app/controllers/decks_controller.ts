import Deck from '#models/deck'
import type { HttpContext } from '@adonisjs/core/http'

export default class DecksController {
  public async index({ response }: HttpContext) {
    const decks = Deck.all()
    return response.send(decks)
  }
  public async show({ response, params }: HttpContext) {
    return response.send(await Deck.find(params.id))
  }
}
