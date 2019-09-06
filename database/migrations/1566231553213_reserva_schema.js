'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservaSchema extends Schema {
  up () {
    this.create('reservas', (table) => {
      table.increments()
      table.string('mes', 20).notNullable()
      table.string('dia', 20).notNullable()
      table.string('hora_llegada', 20).notNullable()
      table.string('mesa', 20).notNullable()
      table.integer('id_persona').notNullable().references('id').inTable('personas');
      table.timestamps()
    })
  }

  down () {
    this.drop('reservas')
  }
}

module.exports = ReservaSchema
