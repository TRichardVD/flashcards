import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { UserFactory } from '#database/factories/1_user_factory'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        id: 1,
        username: 'Marie Dupont',
        email: 'marie.dupont@example.com',
        password: 'motDePasse1',
      },
      {
        id: 2,
        username: 'Jean Jacques',
        email: 'jean.jacques@example.com',
        password: 'motDePasse2',
      },
      {
        id: 3,
        username: 'Élodie Martin',
        email: 'elodie.martin@example.com',
        password: 'motDePasse3',
      },
      {
        id: 4,
        username: 'Pierre Bourdon',
        email: 'pierre.bourdon@example.com',
        password: 'motDePasse4',
      },
      {
        id: 5,
        username: 'Anaïs Moreau',
        email: 'anais.moreau@example.com',
        password: 'motDePasse5',
      },
      {
        id: 6,
        username: 'Matthieu Dumont',
        email: 'matthieu.dumont@example.com',
        password: 'motDePasse6',
      },
      {
        id: 7,
        username: '123User',
        email: 'utilisateur7@example.com',
        password: 'motDePasse7',
      },
      {
        id: 8,
        username: 'Antoine Rousseau',
        email: 'antoine.rousseau@example.com',
        password: 'motDePasse8',
      },
      {
        id: 9,
        username: 'Sophie Garnier',
        email: 'sophie.garnier@example.com',
        password: 'motDePasse9',
      },
      {
        id: 10,
        username: 'Thomas Marchand',
        email: 'thomas.marchand@example.com',
        password: 'motDePasse10',
      },
    ])
    await UserFactory.createMany(100)
  }
}
