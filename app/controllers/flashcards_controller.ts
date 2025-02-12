import type { HttpContext } from '@adonisjs/core/http'
import Flashcard from '#models/flashcard'

export default class FlashcardsController {
  public async index({ response }: HttpContext) {
    const flashcards = Flashcard.all()
    return response.send(flashcards)
  }
  public async show({ response, params }: HttpContext) {
    return response.send(await Flashcard.find(params.id))
  }
}
