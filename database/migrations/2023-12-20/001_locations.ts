import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('_id').unique()
      table
        .string('code', 30)
        .notNullable()
        .unique()
        .primary()
        .comment(
          'Uniq Code Terdiri dari "Gabungan" [[kode_negara]-[kode_provinsi]-[kode_kabkota]-[kode_kecamatan]-kode_desa]'
        )
      table.string('postalCode').notNullable().comment('Kode Pos Sebagai Referensi')
      table
        .string('name')
        .unique()
        .notNullable()
        .comment('Nama Lokasi (Desa, Kecamatan, Kabupaten Kota, Provinsi)')
      table.string('negaraCode').unique().notNullable().comment('pasti punya Negara code')
      table.string('provinsiCode').unique().notNullable().comment('pasti punya Provinsi code')
      table.string('kabkotaCode').unique().nullable().comment('optional')
      table.string('kecamatanCode').unique().nullable().comment('optional')
      table.string('desaCode').unique().nullable().comment('optional')
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
