import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'client_admins'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('companyCode', 3).notNullable().references('companies.code')
      table
        .string('clientCode', 3)
        .unique()
        .notNullable()
        .references('clients.code')
        .comment('Ref: clients.code')
      table
        .string('userCode', 3)
        .unique()
        .notNullable()
        .references('user_accounts.code')
        .comment('Ref: user_accounts.code')
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
