import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('_id')
      table.string('code', 6).unique().notNullable().primary()
      table.string('name', 20).unique().notNullable()
      table.string('description', 255).nullable()
      table.string('price', 20).nullable()
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.dateTime('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
