import vine from '@vinejs/vine'

export const FlashcardValidator = vine.compile(
  vine.object({
    recto: vine.string().minLength(1).maxLength(1000),
    verso: vine.string().minLength(1).maxLength(1000),
  })
)
