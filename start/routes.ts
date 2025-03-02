/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'
import FlashcardsController from '#controllers/flashcards_controller'
import DecksController from '#controllers/decks_controller'

// Gestion Utilisateurs
const userControllers = new UsersController()
router
  .get('/users', async (ctx: HttpContext) => {
    return userControllers.index(ctx)
  })
  .as('users.index')

router
  .get('/users/:id', async (ctx: HttpContext) => {
    return userControllers.show(ctx)
  })
  .as('users.show')

// Gestion Decks
const decksController = new DecksController()

router
  .get('/decks', async (ctx: HttpContext) => {
    return decksController.index(ctx)
  })
  .as('decks.index')

router
  .get('/decks/:id', async (ctx: HttpContext) => {
    return decksController.show(ctx)
  })
  .as('decks.show')

// Gestion Flashcards
const flashcardsController = new FlashcardsController()

router
  .get('/flashcards', async (ctx: HttpContext) => {
    return await flashcardsController.index(ctx)
  })
  .as('flashcards.index')

router
  .get('/flashcards/:id', async (ctx: HttpContext) => {
    return await flashcardsController.show(ctx)
  })
  .as('flashcards.show')

// router.get('/flashcards/add', async (ctx: HttpContext) => {
//   // TODO : Retourner le formulaire
// })

router
  .post('/flashcards/add', async (ctx: HttpContext) => {
    return await flashcardsController.store(ctx)
  })
  .as('flashcards.store')

// TODO : Route de login

// TODO : Route de register

// TODO : Page de gestion des decks et des cartes

// TODO : Page de jeu (avec les decks et les cartes)

// TODO : Page 404 : Page non trouvée
