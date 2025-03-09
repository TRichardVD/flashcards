import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 't_flashcards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('recto').notNullable()
      table.string('verso').notNullable()

      table
        .integer('deck_fk')
        .unsigned()
        .references('id')
        .inTable('t_decks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('user_fk')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('t_users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
