import type { HttpContext } from '@adonisjs/core/http'
import Deck from '#models/deck'
import Flashcard from '#models/flashcard'

export default class StudyController {
  public async start({ params, view, session, response, auth }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    if (deck.user_fk !== auth.user?.id) {
      session.flash('error', "Vous n'avez pas accès à ce deck")
      return response.redirect().toRoute('users.show', { id: auth.user?.id })
    }

    // Check if the deck has any flashcards
    const flashcardsCount = await Flashcard.query().where('deck_fk', deck.id).count('* as total')
    const count = Number(flashcardsCount[0].$extras.total)

    if (count === 0) {
      session.flash(
        'error',
        "Ce deck ne contient aucune carte à réviser. Veuillez ajouter des cartes avant de démarrer une session d'étude."
      )
      return response.redirect().toRoute('decks.show', { id: deck.id })
    }

    return view.render('pages/decks/studyStart', { deck })
  }

  public async play({ params, view, session, response, auth }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    if (deck.user_fk !== auth.user?.id) {
      session.flash('error', "Vous n'avez pas accès à ce deck")
      return response.redirect().toRoute('users.show', { id: auth.user?.id })
    }

    const flashcards = await Flashcard.query().where('deck_fk', deck.id)

    // Check if there are any flashcards
    if (flashcards.length === 0) {
      session.flash(
        'error',
        "Ce deck ne contient aucune carte à réviser. Veuillez ajouter des cartes avant de démarrer une session d'étude."
      )
      return response.redirect().toRoute('decks.show', { id: deck.id })
    }

    const startTime = Date.now()

    // Store startTime in session
    session.put('study_start_time', startTime)

    // Initialize score tracking
    session.put('study_flashcards_total', flashcards.length)
    session.put('study_flashcards_correct', 0)

    return view.render('pages/decks/studyPlay', {
      deck,
      flashcards,
      startTime,
      currentCardIndex: 0,
    })
  }

  public async recordAnswer({ params, request, response, session, auth }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    if (deck.user_fk !== auth.user?.id) {
      session.flash('error', "Vous n'avez pas accès à ce deck")
      return response.status(403).json({ success: false })
    }

    try {
      const { isCorrect, cardIndex, isLastCard } = request.body()

      console.log(
        `Recording answer: correct=${isCorrect}, index=${cardIndex}, isLast=${isLastCard}`
      )

      // Update the correct answers count if the answer was correct
      if (isCorrect === true) {
        const currentCorrect = session.get('study_flashcards_correct', 0)
        session.put('study_flashcards_correct', currentCorrect + 1)
        console.log(`Updated correct answers: ${currentCorrect} -> ${currentCorrect + 1}`)
      }

      // If it's the last card, redirect to finish page
      if (isLastCard === true) {
        return response.json({ success: true, redirect: true })
      } else {
        // Otherwise return success to continue with next card
        return response.json({ success: true, redirect: false })
      }
    } catch (error) {
      console.error('Error recording answer:', error)
      return response.status(500).json({
        success: false,
        message: 'Failed to record answer',
        error: error.message,
      })
    }
  }

  public async finish({ params, response, view, session, auth }: HttpContext) {
    const deck = await Deck.findOrFail(params.deckId)
    if (deck.user_fk !== auth.user?.id) {
      session.flash('error', "Vous n'avez pas accès à ce deck")
      return response.redirect().toRoute('users.show', { id: auth.user?.id })
    }

    try {
      const startTime = session.get('study_start_time')
      const endTime = Date.now()
      const totalTime = Math.floor((endTime - startTime) / 1000)
      const minutes = Math.floor(totalTime / 60)
      const seconds = totalTime % 60

      // Get the score
      const totalCards = session.get('study_flashcards_total', 0)
      const correctCards = session.get('study_flashcards_correct', 0)
      const score = {
        correct: correctCards,
        total: totalCards,
        percentage: totalCards > 0 ? Math.round((correctCards / totalCards) * 100) : 0,
      }

      // If StudySession model is being used, save the session
      try {
        const StudySession = (await import('#models/study_session')).default
        if (auth.user) {
          await StudySession.create({
            user_fk: auth.user.id,
            deck_fk: params.deckId,
            correct_count: correctCards,
            total_count: totalCards,
            duration_seconds: totalTime,
          })
        }
      } catch (e) {
        console.error('Failed to save study session:', e)
        // Continue without saving study session
      }

      // Clear the session data
      session.forget('study_start_time')
      session.forget('study_flashcards_total')
      session.forget('study_flashcards_correct')

      return view.render('pages/decks/studyEnd', {
        minutes,
        seconds,
        totalTime,
        score,
      })
    } catch (error) {
      console.error('Error finishing study session:', error)
      session.flash(
        'error',
        "Une erreur est survenue lors de la finalisation de votre session d'étude"
      )
      return response.redirect().toRoute('home')
    }
  }
}
