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
        deckId: 1,
        user_id: 1,
      },
      {
        id: 2,
        recto: 'Au revoir',
        verso: 'Goodbye',
        deckId: 1,
        user_id: 1,
      },
      {
        id: 3,
        recto: 'Merci',
        verso: 'Thank you',
        deckId: 1,
        user_id: 1,
      },
      {
        id: 4,
        recto: "S'il vous plaît",
        verso: 'Please',
        deckId: 2,
        user_id: 1,
      },
      {
        id: 5,
        recto: 'De rien',
        verso: "You're welcome",
        deckId: 2,
        user_id: 1,
      },
      {
        id: 6,
        recto: 'Oui',
        verso: 'Yes',
        deckId: 3,
        user_id: 2,
      },
      {
        id: 7,
        recto: 'Non',
        verso: 'No',
        deckId: 3,
        user_id: 2,
      },
      {
        id: 8,
        recto: 'Peut-être',
        verso: 'Maybe',
        deckId: 3,
        user_id: 2,
      },
      {
        id: 9,
        recto: 'Comment ça va ?',
        verso: 'How are you?',
        deckId: 1,
        user_id: 1,
      },
      {
        id: 10,
        recto: "Je m'appelle",
        verso: 'My name is',
        deckId: 2,
        user_id: 1,
      },
    ])
    await FlashcardFactory.createMany(100)
  }
}
