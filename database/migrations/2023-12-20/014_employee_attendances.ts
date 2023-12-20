import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employee_attendances'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('_id').primary()
      table.string('companyCode', 3).notNullable().references('companies.code')
      table.string('employeeCode', 8).notNullable().references('employees.code')
      table.string('shiftCode', 3).notNullable().references('shift_types.code')
      table.date('date')
      table.time('clockInAt').nullable()
      table.time('clockOutAt').nullable()
      table.string('locationCoordinate').nullable().comment('Lokasi Saat Absen Dilakukan')
      table.string('status', 20).nullable().comment('[late,ontime,early,others]')
      table
        .string('note', 255)
        .nullable()
        .comment('diisi oleh karyawan yg bersangkutan saat absen dilakukan')
      table.boolean('isAproved').notNullable().defaultTo(false)
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
