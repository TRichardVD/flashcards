import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator } from '#validators/user'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '#models/user'

export default class SecurityController {
  async login({ view }: HttpContext) {
    return view.render('pages/login/login')
  }

  async createSession({ request, response, auth, session }: HttpContextContract) {
    const { email, password } = await request.validateUsing(loginUserValidator)
    console.log('email', email)
    console.log('password', password)
    const user = await User.verifyCredentials(email, password)
    console.log('user', user)
    if (!user) {
      console.error('Erreur dans la création de la session')
      session.flash('error', 'Erreur dans la création de la session')
      return response.redirect().toRoute('login')
    }
    try {
      await auth.use('web').login(user)
    } catch (err) {
      console.error('Erreur dans la création de la session', err)
      session.flash('error', 'Erreur dans la création de la session')
      return response.redirect().toRoute('login')
    }

    console.log('Utilisateur connecté avec succès', user)
    session.flash('success', 'Vous êtes connecté avec succès')

    return response.redirect().toRoute('home')
  }

  logout = async ({ auth, response, session }: HttpContext) => {
    await auth.use('web').logout()
    session.flash('success', 'Vous êtes déconnecté avec succès')
    return response.redirect().toRoute('home')
  }
}
