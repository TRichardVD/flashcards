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

// Gestion Utilisateurs
router.get('/users', [UsersController, 'index']).as('users.index')

router.get('/users/:id', [UsersController, 'show']).as('users.show')

// Gestion Decks
router.get('/decks', [DecksController, 'index']).as('decks.index')

router.get('/decks/:id', [DecksController, 'show']).as('decks.show')

// Route pour créer un deck
// router.get('/decks/add', async (ctx : HttpContext) => {

// })

router.post('/decks/add', [DecksController, 'store'])

// Gestion Flashcards

router.get('/flashcards', [FlashcardsController, 'index']).as('flashcards.index')

router.get('/flashcards/:id', [FlashcardsController, 'show']).as('flashcards.show')

// router.get('/flashcards/add', async (ctx: HttpContext) => {
//   // TODO : Retourner le formulaire
// })

router.post('/flashcards/add', [FlashcardsController, 'store']).as('flashcards.store')

// TODO : Route de login

// TODO : Route de register

// router.post('/register', async (ctx: HttpContext) => {}).as('users.create')

// router.post('/users/add', async (ctx: HttpContext) => {}).as('users.store')

// TODO : Page de gestion des decks et des cartes

// TODO : Page de jeu (avec les decks et les cartes)

// TODO : Page 404 : Page non trouvée
