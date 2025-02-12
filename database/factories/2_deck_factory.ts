import factory from '@adonisjs/lucid/factories'
import Deck from '#models/deck'

export const DeckFactory = factory
  .define(Deck, async ({ faker }) => {
    return {
      name: faker.lorem.words(2),
      user_id: faker.number.int({ min: 1, max: 20 }),
    }
  })
  .build()
