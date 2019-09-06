'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonaSchema extends Schema {
  up () {
    this.create('personas', (table) => {
      table.increments()
      table.string('nombre', 80).notNullable()
      table.string('apellidopaterno', 80).notNullable()
      table.string('apellidomaterno', 80).notNullable()
      table.string('direccion', 80).notNullable()
      table.string('telefono', 80).notNullable()
      table.integer('iduser').notNullable().references('id').inTable('users');
      table.timestamps()
    })
  }

  down () {
    this.drop('personas')
  }
}

module.exports = PersonaSchema
