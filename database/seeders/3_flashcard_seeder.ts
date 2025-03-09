import { FlashcardFactory } from '#database/factories/3_flashcard_factory'
import Flashcard from '#models/flashcard'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Flashcard.createMany([
      {
        id: 1,
        recto: 'Bonjour',
        verso: 'Hello',
        deck_fk: 1,
        user_fk: 1,
      },
      {
        id: 2,
        recto: 'Au revoir',
        verso: 'Goodbye',
        deck_fk: 1,
        user_fk: 1,
      },
      {
        id: 3,
        recto: 'Merci',
        verso: 'Thank you',
        deck_fk: 1,
        user_fk: 1,
      },
      {
        id: 4,
        recto: "S'il vous plaît",
        verso: 'Please',
        deck_fk: 2,
        user_fk: 1,
      },
      {
        id: 5,
        recto: 'De rien',
        verso: "You're welcome",
        deck_fk: 2,
        user_fk: 1,
      },
      {
        id: 6,
        recto: 'Oui',
        verso: 'Yes',
        deck_fk: 3,
        user_fk: 2,
      },
      {
        id: 7,
        recto: 'Non',
        verso: 'No',
        deck_fk: 3,
        user_fk: 2,
      },
      {
        id: 8,
        recto: 'Peut-être',
        verso: 'Maybe',
        deck_fk: 3,
        user_fk: 2,
      },
      {
        id: 9,
        recto: 'Comment ça va ?',
        verso: 'How are you?',
        deck_fk: 1,
        user_fk: 1,
      },
      {
        id: 10,
        recto: "Je m'appelle",
        verso: 'My name is',
        deck_fk: 2,
        user_fk: 1,
      },
    ])
    await FlashcardFactory.createMany(100)
  }
}
