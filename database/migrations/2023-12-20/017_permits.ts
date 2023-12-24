import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'permits'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id', 11).notNullable().primary()
      table
        .string('employeeCode', 3)
        .notNullable()
        .references('employees.code')
        .comment('Ref: employees.code')
      table
        .string('type')
        .comment('Available Permits: [sick,married,paid-leave,unpaid-leave,joint-holiday]')
      table.datetime('approvedAt', { useTz: true }).nullable()
      table
        .string('approvedBy', 3)
        .nullable()
        .references('employees.code')
        .comment('Ref: employees.code')
      table.timestamp('createdAt', { useTz: true }).notNullable().defaultTo(this.now())
      table.dateTime('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
