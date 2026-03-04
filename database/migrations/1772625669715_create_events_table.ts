import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Relacionamento com usuário
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      // Dados do evento
      table.string('title', 150).notNullable()
      table.text('description')
      table.date('event_date').notNullable()
      table.time('event_time').notNullable()
      table.string('city', 100).notNullable()
      table.string('state', 100).notNullable()
      table.string('location', 255)
      table.string('image_url', 500)

      // Timestamps automáticos
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
