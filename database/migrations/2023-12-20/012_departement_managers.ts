import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'departement_managers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('_id').primary()
      table.string('departementCode', 3).notNullable().references('departements.code')
      table.string('employeeCode', 8).notNullable().references('employees.code')
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
