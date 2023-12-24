import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id', 11).notNullable().primary()
      table
        .string('userCode', 3)
        .notNullable()
        .references('user_accounts.code')
        .comment('Ref: user_accounts.code')
      table.text('token').comment('Token Hash')
      table.datetime('ttl', { useTz: true }).notNullable()
      table.timestamp('createdAt', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
