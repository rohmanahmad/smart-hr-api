import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('_id')
      table
        .string('code', 3)
        .primary()
        .unique()
        .comment('Kode Perusahaan Ditur otomatis oleh sistem')
      table.string('name', 50).notNullable().comment('Wajib Ada Nama Perusahaan')
      table.text('description').nullable().comment('Deskripsi Singkat Perusahaan')
      table.text('address').nullable().comment('Alamat Dari Perusahaan')
      table
        .string('locationCode')
        .nullable()
        .references('locations.code')
        .comment('Ref: locations table')
      table.string('phoneNumber1', 20).nullable().comment('Optional')
      table.string('phoneNumber2', 20).nullable().comment('Optional')
      table.string('email', 100).nullable().comment('optional')
      table.string('website', 100).nullable().comment('optional')
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.dateTime('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
