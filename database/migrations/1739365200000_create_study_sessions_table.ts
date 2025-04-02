import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 't_study_sessions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_fk')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('t_users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .integer('deck_fk')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('t_decks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table.integer('correct_count').notNullable()
      table.integer('total_count').notNullable()
      table.integer('duration_seconds').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
