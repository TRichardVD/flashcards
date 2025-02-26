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

router.get('/users/:id', async (ctx: HttpContext) => {
  return userControllers.show(ctx)
})

// Gestion Decks
const decksController = new DecksController()

router.get('/decks', async (ctx: HttpContext) => {
  return decksController.index(ctx)
})

router.get('/decks/:id', async (ctx: HttpContext) => {
  return decksController.show(ctx)
})

// Gestion Flashcards
const flashcardsController = new FlashcardsController()

router.get('/flashcards', async (ctx: HttpContext) => {
  return flashcardsController.index(ctx)
})

router.get('/flashcards/:id', async (ctx: HttpContext) => {
  return flashcardsController.show(ctx)
})

// TODO : Page de connetion et de création de compte

// TODO : Page de gestion des decks et des cartes

// TODO : Page de jeu (avec les decks et les cartes)

// TODO : Page 404 : Page non trouvée
