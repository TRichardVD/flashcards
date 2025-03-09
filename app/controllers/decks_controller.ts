import Deck from '#models/deck'
import Flashcard from '#models/flashcard'
import type { HttpContext } from '@adonisjs/core/http'
import { DeckValidator } from '#validators/deck'

export default class DecksController {
  public async index({ response }: HttpContext) {
    try {
      const decks = await Deck.query().orderBy('id', 'asc')
      return response.send(decks)
    } catch (err) {
      console.log(err)
      return response.send('Erreur')
    }
  }
  public async show({ response, params, view }: HttpContext) {
    try {
      const deck = await Deck.find(params.id)
      const flashcards = await Flashcard.query().where('deck_fk', params.id).orderBy('id', 'asc')
      return view.render('pages/FlashcardsEdition/show', { flashcards: flashcards, deck: deck })
    } catch (err) {
      console.log(err)
      return response.send('Erreur')
    }
  }

  // public async create({ view }: HttpContext) {}

  public async store({ request, response }: HttpContext) {
    try {
      const { name } = await DeckValidator.validate(request.body())

      const deck = await Deck.create({ name: name, user_fk: 1 })
      return response.json({ message: 'Nouveau deck créé', data: deck })
    } catch (err) {
      return response.json({ error: "Une erreur s'est produite durant la création du deck" })
    }
  }

  // public async edit({ params }: HttpContext) {}

  // public async update({ params, request }: HttpContext) {}

  // public async destroy({ params, response }: HttpContext) {}
}
