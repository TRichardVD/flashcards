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

router
  .get('/users', async (ctx: HttpContext) => {
    return new UsersController().index(ctx)
  })
  .as('users.index')

// TODO : Page de connetion et de création de compte

// TODO : Page de gestion des decks et des cartes

// TODO : Page de jeu (avec les decks et les cartes)

// TODO : Page 404 : Page non trouvée
