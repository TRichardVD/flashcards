/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'
import FlashcardsController from '#controllers/flashcards_controller'
import DecksController from '#controllers/decks_controller'
import type { HttpContext } from '@adonisjs/core/http'
import { middleware } from './kernel.js'
import SecurityController from '#controllers/security_controller'
import StudyController from '#controllers/study_controller'

router.get('/login', [SecurityController, 'login']).as('login')

router.post('/login', [SecurityController, 'createSession']).as('login.post')

router.get('/register', async (ctx: HttpContext) => {
  return ctx.view.render('pages/login/register')
})

router.post('/register', [UsersController, 'store']).as('users.store')

router
  .group(() => {
    router
      .get('/', async ({ auth, response }: HttpContext) => {
        if (!auth.user) {
          return response.redirect().toRoute('login')
        }
        return response.redirect().toRoute('users.show', { id: auth.user.id })
      })
      .as('home')

    // Page de deconnexion
    router.get('/logout', [SecurityController, 'logout']).as('logout')

    // Gestion Utilisateurs
    router.get('/users/:id', [UsersController, 'show']).as('users.show')

    // Gestion Decks
    router.get('/decks', [DecksController, 'index']).as('decks.index')

    // Route pour créer un deck
    router.get('/decks/add', [DecksController, 'create']).as('decks.create')

    router.post('/decks/add', [DecksController, 'store']).as('decks.store')
    router.get('/decks/:id', [DecksController, 'show']).as('decks.show')

    router.delete('/decks/:id', [DecksController, 'destroy']).as('decks.destroy')

    router.get('/decks/:id/edit', [DecksController, 'edit']).as('decks.edit')
    router.put('/decks/:id', [DecksController, 'update']).as('decks.update')

    // Gestion Flashcards

    router.get('/flashcards/:id', [FlashcardsController, 'show']).as('flashcards.show')

    router.get('/flashcards/:id/add', [FlashcardsController, 'create']).as('flashcards.create')

    router.post('/flashcards/:id/add', [FlashcardsController, 'store']).as('flashcards.store')

    router.get('/flashcards/:id/edit', [FlashcardsController, 'edit']).as('flashcards.edit')

    router.post('/flashcards/:id/edit', [FlashcardsController, 'update']).as('flashcards.update')

    router.get('/flashcards/:id/delete', [FlashcardsController, 'delete']).as('flashcards.delete')

    router.delete('/flashcards/:id/', [FlashcardsController, 'destroy']).as('flashcards.destroy')

    // flux d'étude chronométrée
    router.get('/study/:deckId', [StudyController, 'start']).as('study.start')
    router.post('/study/:deckId/play', [StudyController, 'play']).as('study.play')
    router.post('/study/:deckId/answer', [StudyController, 'recordAnswer']).as('study.answer')
    router.post('/study/:deckId/finish', [StudyController, 'finish']).as('study.finish')
  })
  .middleware(middleware.auth()) // Middleware d'authentification

// Page 404 : Page non trouvée
router.get('*', async (ctx: HttpContext) => {
  ctx.session.flash({ error: 'Page non trouvée' })
  return ctx.response.redirect('/login')
})
