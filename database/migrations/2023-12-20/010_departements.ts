import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'departements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.string('code', 3).unique().primary()
      table.string('companyCode', 3).notNullable().references('companies.code')
      table.string('name', 30).notNullable()
      table.text('description').notNullable()
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
