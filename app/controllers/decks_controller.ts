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
      return response.send('Erreur lors de la récupération des decks')
    }
  }
  public async show({ response, params, view, auth, session }: HttpContext) {
    try {
      const deck = await Deck.find(params.id)
      const flashcards = await Flashcard.query().where('deck_fk', params.id).orderBy('id', 'asc')
      if (deck?.user_fk !== auth.user?.id) {
        session.flash('error', "Vous n'avez pas accès à ce deck")
        return response.redirect().toRoute('users.show', { id: auth.user?.id })
      }

      return view.render('pages/Decks/show', { flashcards: flashcards, deck: deck })
    } catch (err) {
      console.log(err)
      return response.send('Erreur lors de la récupération du deck')
    }
  }

  public async create({ view }: HttpContext) {
    return view.render('pages/Decks/add')
  }

  public async store({ request, response, session, auth }: HttpContext) {
    const { name, description } = await request.validateUsing(DeckValidator(null, auth.user?.id))

    try {
      const deck = await Deck.create({
        name: name,
        user_fk: Number(auth.user?.id),
        description: description,
      })
      session.flash('success', 'Deck créé avec succès')

      return response.redirect().toRoute('users.show', { id: deck.user_fk })
    } catch (err) {
      return response.json({ error: "Une erreur s'est produite durant la création du deck" })
    }
  }

  public async edit({ view, params }: HttpContext) {
    const deck = await Deck.find(Number(params.id))
    return view.render('pages/Decks/edit', { deck: deck })
  }

  public async update({ params, request, auth, session, response }: HttpContext) {
    try {
      const deck = await Deck.find(params.id)
      if (!deck) {
        session.flash('error', 'Deck introuvable')
        return response.redirect().back()
      }

      if (deck?.user_fk !== auth.user?.id) {
        session.flash('error', "Vous n'avez pas accès à ce deck")
        return response.redirect().toRoute('users.show', { id: auth.user?.id })
      }

      const { name, description } = await request.validateUsing(
        DeckValidator(deck?.id, deck?.user_fk)
      )

      deck.name = name
      deck.description = description || ''
      await deck.save()

      session.flash('success', 'Deck modifié avec succès')
      return response.redirect().toRoute('decks.show', { id: deck.id })
    } catch (err) {
      console.log(err)
      return response.json({ error: "Une erreur s'est produite durant la modification du deck" })
    }
  }

  public async destroy({ params, response, session, auth }: HttpContext) {
    try {
      const deck = await Deck.find(params.id)
      if (!deck) {
        session.flash('error', 'Deck introuvable')
        return response.redirect().back()
      }

      if (deck?.user_fk !== auth.user?.id) {
        session.flash('error', "Vous n'avez pas accès à ce deck")
        return response.redirect().toRoute('users.show', { id: params.user_id })
      }

      await deck.delete()
      session.flash('success', 'Deck supprimé avec succès')
      return response.redirect().toRoute('users.show', { id: deck.user_fk })
    } catch (err) {
      console.log(err)
      return response.json({ error: "Une erreur s'est produite durant la suppression du deck" })
    }
  }
}
