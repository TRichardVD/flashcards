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

  public async store({ response, request }: HttpContext) {
    try {
      const { recto, verso, deckId, userId } = request.body()

      const fc = new Flashcard()
      fc.recto = recto
      fc.verso = verso
      fc.deckId = deckId
      fc.user_id = userId

      await fc.save()

      return response.json({ message: 'Flashcard correctement créée' })
    } catch (err) {
      return response.send("Une erreur s'est produite durant la création de l'objet")
    }
  }

  //public async store({ request }: HttpContext) {}

  //public async create({ view }: HttpContext) {}

  //public async store({ request }: HttpContext) {}

  //public async update({ params, request }: HttpContext) {}

  //public async destroy({ params, response }: HttpContext) {}

  //public async edit({ params }: HttpContext) {}
}
