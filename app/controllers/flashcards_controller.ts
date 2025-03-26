import type { HttpContext } from '@adonisjs/core/http'
import Flashcard from '#models/flashcard'
import Deck from '#models/deck'
import { FlashcardValidator } from '#validators/flashcard'

export default class FlashcardsController {
  public async show({ params, view, session, auth }: HttpContext) {
    const card = await Flashcard.findByOrFail('id', params.id)
    if (!card) {
      return session.flash('error', 'Flashcard introuvable')
    }
    if (card?.user_fk !== auth.user?.id) {
      return session.flash('error', "Vous n'avez pas accès à ce deck")
    }

    return view.render('pages/flashcards/show', { flashcard: card })
  }

  public async store({ response, request, params, session, auth }: HttpContext) {
    const deckId = Number(params.id)

    const { recto, verso } = await request.validateUsing(FlashcardValidator(deckId, 0))

    const fc = new Flashcard()
    fc.recto = recto
    fc.verso = verso
    fc.deck_fk = deckId
    fc.user_fk = Number(auth.user?.id)

    await fc.save()

    session.flash('success', 'Objet créé avec succès')
    return response.redirect().toRoute('decks.show', { id: params.id })
  }

  public create = async (ctx: HttpContext) => {
    const deck = await Deck.findByOrFail('id', Number(ctx.params.id))
    if (!deck) {
      return ctx.response.send('Deck introuvable')
    }

    if (deck?.user_fk !== ctx.auth.user?.id) {
      return ctx.response.send("Vous n'avez pas accès à ce deck")
    }

    return ctx.view.render('pages/flashcards/add', { deck: deck })
  }

  public async edit({ view, params, session }: HttpContext) {
    const card = await Flashcard.findByOrFail('id', params.id)
    const deck = await Deck.findByOrFail('id', card.deck_fk)
    if (!card || !deck) {
      return session.flash('error', 'Flashcard ou Deck introuvable')
    }

    return view.render('pages/flashcards/edit', { flashcard: card, deck: deck })
  }

  public async update({ params, request, response, session, auth }: HttpContext) {
    const card = await Flashcard.findByOrFail('id', params.id)
    if (!card) {
      session.flash('error', 'Flashcard introuvable')
      return response.redirect().back()
    }

    const data = await request.validateUsing(FlashcardValidator(card.deck_fk, card.id))

    if (card?.user_fk !== auth.user?.id) {
      session.flash('error', "Vous n'avez pas accès à ce deck")
      return response.redirect().toRoute('users.show', { id: auth.user?.id })
    }

    try {
      card.merge(data)
      await card.save()
      session.flash('success', 'Objet modifié avec succès')
      return response.redirect().toRoute('decks.show', { id: card.deck_fk })
    } catch (validationError) {
      // Flash validation errors
      session.flash('errors', validationError.messages)
      // Flash old form input values to preserve user data
      session.flashAll()
      // Redirect back to the form
      return response.redirect().back()
    }
  }

  public async destroy({ params, response, session, auth }: HttpContext) {
    if (!params.id) {
      session.flash('error', 'Aucun id fourni')
      return response.redirect().back()
    }

    const card = await Flashcard.findByOrFail('id', Number(params.id))

    if (card?.user_fk !== auth.user?.id) {
      session.flash('error', "Vous n'avez pas accès à ce deck")
      return response.redirect().toRoute('user.show', { id: auth.user?.id })
    }

    await card.delete()
    session.flash('success', 'Objet supprimé avec succès')
    return response.redirect().toRoute('decks.show', { id: card.deck_fk })
  }

  public async delete({ view, params, session, response }: HttpContext) {
    try {
      const card = await Flashcard.findByOrFail('id', params.id)
      if (!card) {
        return session.flash('error', 'Flashcard introuvable')
      }
      return view.render('pages/flashcards/delete', { flashcard: card })
    } catch (err) {
      session.flash('error', 'Flashcard introuvable')
      return response.redirect().back()
    }
  }
}
