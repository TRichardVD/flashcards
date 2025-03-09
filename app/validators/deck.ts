import vine from '@vinejs/vine'

export const DeckValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1).maxLength(100),
  })
)
