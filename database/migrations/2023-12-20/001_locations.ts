import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id').unique()
      table.string('code', 4).notNullable().unique().primary().comment('Uniq Code Random')
      table.string('postalCode').notNullable().comment('Kode Pos Sebagai Referensi')
      table
        .string('name')
        .unique()
        .notNullable()
        .comment('Nama Lokasi (Desa, Kecamatan, Kabupaten Kota, Provinsi)')
      table.string('negaraCode', 4).unique().notNullable().comment('pasti punya Negara code')
      table.string('provinsiCode', 4).unique().notNullable().comment('pasti punya Provinsi code')
      table
        .string('kabkotaCode', 4)
        .unique()
        .nullable()
        .references('locations.code')
        .comment('optional')
      table
        .string('kecamatanCode', 4)
        .unique()
        .nullable()
        .references('locations.code')
        .comment('optional')
      table
        .string('desaCode', 4)
        .unique()
        .nullable()
        .references('locations.code')
        .comment('optional')
      table.timestamp('createdAt', { useTz: true }).defaultTo(this.now())
      table.timestamp('updatedAt', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
