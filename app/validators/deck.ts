import vine from '@vinejs/vine'

export const DeckValidator = (deck_id: number, user_fk: number) =>
  vine.compile(
    vine.object({
      name: vine
        .string()
        .minLength(1)
        .maxLength(100)
        .unique(async (db, value) => {
          if (!user_fk) return false
          if (!deck_id) {
            const existingCard = await db
              .from('t_decks')
              .where('name', value)
              .andWhere('user_fk', user_fk)
              .first()

            return !existingCard
          }
          const existingCard = await db
            .from('t_decks')
            .where('name', value)
            .andWhere('user_fk', user_fk)
            .andWhere('id', '!=', deck_id)
            .first()

          return !existingCard
        }),
      description: vine.string().minLength(10).maxLength(500),
    })
  )
