import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Deck from '#models/deck'

export default class Flashcard extends BaseModel {
  public static table = 't_flashcards'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare recto: String

  @column()
  declare verso: String

  @column()
  declare deckId: number

  @belongsTo(() => Deck)
  declare deck: ReturnType<typeof belongsTo>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
