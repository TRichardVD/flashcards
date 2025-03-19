import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Deck from '#models/deck'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class StudySession extends BaseModel {
  public static table = 't_study_sessions'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_fk: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare deck_fk: number

  @belongsTo(() => Deck)
  declare deck: BelongsTo<typeof Deck>

  @column()
  declare correct_count: number

  @column()
  declare total_count: number

  @column()
  declare duration_seconds: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
