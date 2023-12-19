import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employee_attendances'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('_id').primary()
      table.string('employeeCode', 8).notNullable().references('employees.code')
      table.string('shiftCode', 3).notNullable().references('shift_types.code')
      table.string('clockType', 20).notNullable()
      table.date('date')
      table.time('time')
      table.string('status', 20).nullable()
      table.string('note', 255).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
