import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { UserFactory } from '#database/factories/1_user_factory'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        id: 1,
        fullName: 'Marie Dupont',
        email: 'marie.dupont@example.com',
        password: 'motDePasse1',
      },
      {
        id: 2,
        fullName: 'Jean Jacques',
        email: 'jean.jacques@example.com',
        password: 'motDePasse2',
      },
      {
        id: 3,
        fullName: 'Élodie Martin',
        email: 'elodie.martin@example.com',
        password: 'motDePasse3',
      },
      {
        id: 4,
        fullName: 'Pierre Bourdon',
        email: 'pierre.bourdon@example.com',
        password: 'motDePasse4',
      },
      {
        id: 5,
        fullName: 'Anaïs Moreau',
        email: 'anais.moreau@example.com',
        password: 'motDePasse5',
      },
      {
        id: 6,
        fullName: 'Matthieu Dumont',
        email: 'matthieu.dumont@example.com',
        password: 'motDePasse6',
      },
      {
        id: 7,
        fullName: null,
        email: 'utilisateur7@example.com',
        password: 'motDePasse7',
      },
      {
        id: 8,
        fullName: 'Antoine Rousseau',
        email: 'antoine.rousseau@example.com',
        password: 'motDePasse8',
      },
      {
        id: 9,
        fullName: 'Sophie Garnier',
        email: 'sophie.garnier@example.com',
        password: 'motDePasse9',
      },
      {
        id: 10,
        fullName: 'Thomas Marchand',
        email: 'thomas.marchand@example.com',
        password: 'motDePasse10',
      },
    ])
    await UserFactory.createMany(100)
  }
}
