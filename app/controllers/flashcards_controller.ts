import type { HttpContext } from '@adonisjs/core/http'
import Flashcard from '#models/flashcard'
import Deck from '#models/deck'
import { Session } from 'inspector/promises'

export default class FlashcardsController {
  public async index({ response }: HttpContext) {
    try {
      const flashcards = await Flashcard.query().orderBy('id', 'asc')
      return response.send(flashcards)
    } catch (err) {
      return response.send('Erreur')
    }
  }
  public async show({ response, params }: HttpContext) {
    try {
      return response.send(await Flashcard.find(params.id))
    } catch (err) {
      return response.send('Erreur')
    }
  }

  public async store({ response, request, params, session }: HttpContext) {
    try {
      console.log(request.body())
      const { recto, verso } = request.body()

      const fc = new Flashcard()
      fc.recto = recto
      fc.verso = verso
      fc.deckId = params.id
      fc.user_id = 1

      await fc.save()

      session.flash('success', 'Objet créé avec succès')
      return response.redirect().toRoute('decks.show', { id: params.id })
    } catch (err) {
      return session.flash('error', "Une erreur s'est produite durant la création de l'objet")
    }
  }

  public create = async (ctx: HttpContext) => {
    // TODO : Retourner le formulaire
    const deck = await Deck.findByOrFail('id', ctx.params.id)
    if (!deck) {
      return ctx.response.send('Deck introuvable')
    }
    return ctx.view.render('pages/FlashcardsEdition/add', { deck: deck })
  }

  public async edit({ view, params, session }: HttpContext) {
    const card = await Flashcard.findByOrFail('id', params.id)
    const deck = await Deck.findByOrFail('id', card.deckId)
    if (!card || !deck) {
      return session.flash('error', 'Flashcard ou Deck introuvable')
    }

    return view.render('pages/FlashcardsEdition/edit', { flashcard: card, deck: deck })
  }

  public async update({ params, request, response, session }: HttpContext) {
    try {
      const card = await Flashcard.findByOrFail('id', params.id)
      card.merge(request.body())
      await card.save()
      session.flash('success', 'Objet modifié avec succès')
      return response.redirect().toRoute('decks.show', { id: card.deckId })
    } catch (err) {
      return session.flash('error', "Une erreur s'est produite durant la modification de l'objet")
    }
  }

  public async destroy({ params, response, session }: HttpContext) {
    try {
      const card = await Flashcard.findByOrFail('id', params.id)
      await card.delete()
      session.flash('success', 'Objet supprimé avec succès')
      return response.redirect().toRoute('decks.show', { id: card.deckId })
    } catch (err) {
      return session.flash('error', "Une erreur s'est produite durant la suppression de l'objet")
    }
  }

  public async delete({ view, params, session }: HttpContext) {
    try {
      const card = await Flashcard.findByOrFail('id', params.id)
      if (!card) {
        return session.flash('error', 'Flashcard introuvable')
      }
      return view.render('pages/FlashcardsEdition/delete', { flashcard: card })
    } catch (err) {
      return session.flash('error', 'Flashcard introuvable')
    }
  }
}
