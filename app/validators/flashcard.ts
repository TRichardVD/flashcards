import vine from '@vinejs/vine'

export const FlashcardValidator = (deck_fk: number, card_fk: number) =>
  vine.compile(
    vine.object({
      recto: vine
        .string()
        .minLength(10)
        .maxLength(1000)
        .unique(async (db, value) => {
          if (!deck_fk) return false
          if (!card_fk) {
            const existingCard = await db
              .from('t_flashcards')
              .where('recto', value)
              .andWhere('deck_fk', deck_fk)
              .first()

            return !existingCard
          }
          const existingCard = await db
            .from('t_flashcards')
            .where('recto', value)
            .andWhere('deck_fk', deck_fk)
            .andWhere('id', '!=', card_fk)
            .first()

          return !existingCard
        }),
      verso: vine.string().minLength(10).maxLength(1000),
    })
  )
