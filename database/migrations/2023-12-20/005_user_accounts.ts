import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('_id')
      table.string('code', 3).notNullable().unique().primary()
      table
        .string('companyCode', 3)
        .notNullable()
        .references('companies.code')
        .comment('Ref: companies.code')
      table.string('username', 20).unique()
      table.string('email', 100).unique()
      table.text('password').comment('Hashed Value')
      table.string('status', 20).comment('[active|inactive|pending-confirmation|suspend]')
      table.boolean('trashStatus').comment('true|false')
      table.string('permissionType', 20)
      table.timestamp('createdAt', { useTz: true })
      table.dateTime('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
