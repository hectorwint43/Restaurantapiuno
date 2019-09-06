'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class platillo1
 */
class platillo1 extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'platillo1Hook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * platillo1's schema
   */
  static get schema () {
    return {
      foto:String,
      nombre:String,
      precio:String,
      estado:String
    }
  }
}

module.exports = platillo1.buildModel('platillo1')
