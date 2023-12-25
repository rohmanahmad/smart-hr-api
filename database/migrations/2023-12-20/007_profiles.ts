import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.string('code', 5).primary().unique()
      // table
      //   .string('userCode', 8)
      //   .notNullable()
      //   .references('user_accounts.code')
      //   .comment('Gabungan Antara Kode Perusahaan dan Kode Uniq User ex: PJR-KLX1')
      table.string('firstName', 30).nullable().comment('optional')
      table.string('lastName', 30).nullable().comment('optional')
      table.text('pictureUrl').nullable().comment('optional')
      table.text('address').nullable().comment('optional')
      table.string('locationCode', 30).nullable().references('locations.code').comment('optional')
      table.string('birthDate', 20).nullable().comment('optional')
      table.string('gender', 20).nullable().comment('optional')
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
