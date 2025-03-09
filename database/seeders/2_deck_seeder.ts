import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'
import { DeckFactory } from '#database/factories/2_deck_factory'

export default class extends BaseSeeder {
  async run() {
    await Deck.createMany([
      {
        id: 1,
        name: 'Français-English',
        description: "Un deck pour apprendre le français et l'anglais",
        user_fk: 1,
      },
      {
        id: 2,
        name: 'Spanish-Français',
        description: "Un deck pour apprendre l'espagnol et le français",
        user_fk: 1,
      },
      {
        id: 3,
        name: 'Allemand-Italien',
        description: "Un deck pour apprendre l'allemand et l'italien",
        user_fk: 2,
      },
    ])
    await DeckFactory.createMany(30)
  }
}
