'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MesaSchema extends Schema {
  up () {
    this.create('mesas', (table) => {
      table.increments()
      table.integer('dia').notNullable().references('id').inTable('dias');
      table.string('num_mesa', 10).notNullable()
      table.integer('disponible').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('mesas')
  }
}

module.exports = MesaSchema
