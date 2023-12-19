import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_activities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('_id').primary()
      table.string('userCode', 3).notNullable().references('user_accounts.code')
      table.dateTime('date').nullable()
      table.string('type', 20).nullable()
      table.text('detail').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
