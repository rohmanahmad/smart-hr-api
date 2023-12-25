import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table
        .string('code', 8)
        .notNullable()
        .unique()
        .primary()
        .comment('Gabungan Dari CompanyCode(3) dengan UserAccountCode(4). ex: KHO-LDKK')
      table.string('companyCode', 3).notNullable().references('companies.code')
      table.string('userCode', 4).notNullable().references('user_accounts.code')
      table.string('departementCode', 3).notNullable().references('departements.code')
      table.string('profileCode', 5).notNullable().references('profiles.code')
      table.string('employmentStatus', 20).notNullable().defaultTo('contract')
      table.integer('salary').nullable()
      table.string('jobPosition', 30).nullable()
      table.datetime('hireDate').nullable()
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
