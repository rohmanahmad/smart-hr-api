import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'code_verifications'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('code', 4).notNullable().unique().primary()
      table
        .string('userCode', 3)
        .notNullable()
        .references('user_accounts.code')
        .comment('Ref: user_accounts.code')
      table.string('codeType', 20).comment('registration, forgot_password, others')
      table.boolean('trash').notNullable().defaultTo(false)
      table.datetime('ttl', { useTz: true }).notNullable()
      table.timestamp('createdAt', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
