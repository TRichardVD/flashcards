import vine from '@vinejs/vine'

export const DeckValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1).maxLength(100).unique({ table: 't_decks', column: 'name' }),
    description: vine.string().minLength(10).maxLength(500),
  })
)
