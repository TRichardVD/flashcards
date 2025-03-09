import factory from '@adonisjs/lucid/factories'
import Flashcard from '#models/flashcard'

export const FlashcardFactory = factory
  .define(Flashcard, async ({ faker }) => {
    return {
      recto: faker.lorem.words(5),
      verso: faker.lorem.words(5),
      deck_fk: faker.number.int({ min: 1, max: 20 }),
      user_fk: faker.number.int({ min: 1, max: 20 }),
    }
  })
  .build()
