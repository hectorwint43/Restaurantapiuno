'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      table.integer('idplatillo').notNullable().references('id').inTable('platillos');
      table.integer('idpersona').notNullable().references('id').inTable('personas');
      // table.integer('idcaja').notNullable().references('id').inTable('personas');
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
