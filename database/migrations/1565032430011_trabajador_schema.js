'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TrabajadorSchema extends Schema {
  up () {
    this.create('trabajadors', (table) => {
      table.increments()
      table.string('puesto', 80).notNullable()
      table.string('turno', 80).notNullable()
      table.string('salario', 80).notNullable()
      table.integer('idpersona').notNullable().references('id').inTable('personas');
      table.timestamps()
    })
  }

  down () {
    this.drop('trabajadors')
  }
}

module.exports = TrabajadorSchema
