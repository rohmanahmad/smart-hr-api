import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('_id')
      table.string('code', 3).unique().notNullable().primary()
      table
        .string('name', 30)
        .unique()
        .notNullable()
        .comment('Terdiri dari huruf dan angka (harus diawali dengan huruf)')
      table
        .string('subscriptionCode', 3)
        .nullable()
        .references('subscriptions.code')
        .comment('Ref: subscriptions table')
      table.timestamp('createdAt', { useTz: true })
      table.dateTime('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
