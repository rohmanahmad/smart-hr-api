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
      table.string('token_expired', 10).notNullable().defaultTo('1d')
      table.string('username', 20).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.text('password').notNullable().comment('Hashed Value')
      table
        .string('status', 20)
        .notNullable()
        .comment('[active|inactive|pending-confirmation|suspend]')
        .defaultTo('pending-confirmation')
      table.boolean('trashStatus').notNullable().comment('true|false').defaultTo(false)
      table.string('permissionType', 20).notNullable().defaultTo('basic-user')
      table.timestamp('createdAt', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
