import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscription_features'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('_id').primary()
      table.string('subscriptionCode', 6).notNullable().references('subscriptions.code')
      table.string('feature', 255).notNullable()
      table.string('status', 20).notNullable()
      table.integer('sortIndex').notNullable().defaultTo(0)
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
