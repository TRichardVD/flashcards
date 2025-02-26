import type { HttpContext } from '@adonisjs/core/http'
import Flashcard from '#models/flashcard'

export default class FlashcardsController {
  public async index({ response }: HttpContext) {
    const flashcards = await Flashcard.query().orderBy('id', 'asc')
    return response.send(flashcards)
  }
  public async show({ response, params }: HttpContext) {
    return response.send(await Flashcard.find(params.id))
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
