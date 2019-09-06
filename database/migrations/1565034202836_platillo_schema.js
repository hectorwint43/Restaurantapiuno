'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlatilloSchema extends Schema {
  up () {
    this.create('platillos', (table) => {
      table.increments()
      table.string('foto', 80).notNullable()
      table.string('nombre', 80).notNullable()
      table.decimal('precio', 80).notNullable()
      table.string('estado', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('platillos')
  }
}

module.exports = PlatilloSchema
