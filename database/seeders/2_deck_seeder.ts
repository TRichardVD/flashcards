import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Deck from '#models/deck'
import { DeckFactory } from '#database/factories/2_deck_factory'

export default class extends BaseSeeder {
  async run() {
    await Deck.createMany([
      {
        id: 1,
        name: 'Français-English',
        user_id: 1,
      },
      {
        id: 2,
        name: 'Spanish-Français',
        user_id: 1,
      },
      {
        id: 3,
        name: 'Allemand-Italien',
        user_id: 2,
      },
    ])
    await DeckFactory.createMany(30)
  }
}
