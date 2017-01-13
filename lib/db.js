'use strict'

const co = require('co')
const r = require('rethinkdbdash')({
  db: 'mantenimiento'
})
const Promise = require('bluebird')
const uuid = require('uuid-base62')
const utils = require('./utils') 

class Db {

  insert (tabla, opciones, callback) {
    let tasks = co.wrap(function * (){
      let inserto = yield r.table(tabla).insert(opciones).run()
      if(!inserto){
        return Promise.reject(new Error(`NO RELIZO INSERCIÓN`))
      }
      return Promise.resolve(inserto)
    })
    return Promise.resolve(tasks())
  }

  padres (tabla, opciones) {
    let tasks = co.wrap(function * () {
      let result = yield r.table(tabla).filter(opciones).eqJoin("parent", r.table(tabla))
      if (!result) {
        return Promise.reject(new Error(`RESULTADO NO ENCONTRADO`))
      }
      return Promise.resolve(result)
    })
    return Promise.resolve(tasks())
  }

  delete(tabla, opciones){
    let tasks = co.wrap(function * (){
      console.log(opciones)
      let elimino = yield r.table(tabla).filter(opciones).delete().run()
      if(!elimino){
       return Promise.reject(new Error(`NO RELIZO ELIMINACION`)) 
      }
      return Promise.resolve(elimino)
    })
    return Promise.resolve(tasks())
  }

  update(tabla, opciones, especificaciones){
    let tasks = co.wrap(function * (){
      let actualizo = yield r.table(tabla).filter(opciones).update(especificaciones).run()
      if(!actualizo){
        return Promise.reject(new Error(`NO RELIZO ACTUALIZACION`)) 
      }
      return Promise.resolve(actualizo)
    })
    return Promise.resolve(tasks())
  }

  consult(tabla, opciones){
    let tasks = co.wrap(function * () {
      let result = yield r.table(tabla).filter(opciones).run() 
      if (!result) {
        return Promise.reject(new Error(`RESULTADO NO ENCONTRADO`))
      }
      return Promise.resolve(result)
    })
    return Promise.resolve(tasks())
  }


  listUsers(usuario, callback){
    let tasks = co.wrap(function * () {
      let image = yield r.table('user').filter({username:usuario}).run() 
      if (!image) {
        return Promise.reject(new Error(`image not found`))
      }
      return Promise.resolve(image)
    })
    return Promise.resolve(tasks()).asCallback(callback) 
  }

  saveImage (image, callback) {
    if (!this.connect) {
      return Promise.reject(new Error('not connected')).Callback(callback)
    }

    let connection = this.connection
    let db = this.db

    let tasks = co.wrap(function * () {
      let conn = yield connection
      image.createdAt = new Date()
      image.tags = utils.extractTags(image.description)

      let result = yield r.db(db).table('images').insert(image).run(conn)

      if (result.errors > 0) {
        return Promise.reject(new Error(result.first_error))
      }

      image.id = result.generated_keys[0]

      yield r.db(db).table('images').get(image.id).update({
        public_id: uuid.encode(image.id)
      }).run(conn)

      let created = yield r.db(db).table('images').get(image.id).run(conn)

      return Promise.resolve(created)
    })

    return Promise.resolve(tasks()).asCallback(callback)
  }

  authenticate (username, password, callback) {
    if (!this.connected) {
      return Promise.reject(new Error('not connected')).Callback(callback)
    }

    let getUser = this.getUser.bind(this)

    let tasks = co.wrap(function * () {
      let user = null
      try {
        user = yield getUser(username)
      } catch (e) {
        return Promise.resolve(false)
      }
      if (user.password === utils.encrypt(password)) {
        return Promise.resolve(true)
      }

      return Promise.resolve(false)
    })
    return Promise.resolve(tasks()).asCallback(callback)
  }

}

module.exports = Db