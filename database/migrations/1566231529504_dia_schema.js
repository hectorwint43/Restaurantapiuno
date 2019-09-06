'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DiaSchema extends Schema {
  up () {
    this.create('dias', (table) => {
      table.increments()
      table.string('numero', 10).notNullable()
      table.string('mes', 20).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('dias')
  }
}

module.exports = DiaSchema
