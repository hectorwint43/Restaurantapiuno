'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidooSchema extends Schema {
  up () {
    this.create('pedidoos', (table) => {
      table.increments()
      table.string('nombreplatillo', 80).notNullable()
      table.string('precioplatillo', 80).notNullable()
      table.integer('idpersona').notNullable().references('id').inTable('personas');
      table.string('estado', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidoos')
  }
}

module.exports = PedidooSchema
