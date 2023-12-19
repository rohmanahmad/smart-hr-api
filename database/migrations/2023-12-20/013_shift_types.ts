import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'shift_types'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('_id')
      table.string('code', 3).notNullable().unique().primary()
      table.string('companyCode', 3).notNullable().references('companies.code')
      table.string('name', 20).notNullable()
      table.string('description', 255).nullable()
      table.time('clockIn').notNullable()
      table.time('clockOut').notNullable()
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
