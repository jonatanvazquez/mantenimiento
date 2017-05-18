'use strict'

const co = require('co')
const r = require('rethinkdbdash')({
  db: 'mantenimiento'
})
const Promise = require('bluebird')
const uuid = require('uuid-base62')
const utils = require('./utils') 

class Db {

    insert(table, options){
        return r.table(table).insert(options).run()
    }

    remove(table, options){
        return r.table(table).filter(options).delete().run()
    }

    update(table, options, espec){
        return r.table(table).filter(options).update(espec).run()
    }

    parents(table, options){
        return r.table(table).filter(options).eqJoin("parent", r.table(table)).run()
    }

    showParents(){
        return r.table('component').filter(r.row.hasFields('parent').not())
    }

    queryMachinebyUser(table, areau){
        return r.table(table).filter(r.row.hasFields('parent').not().and(r.row('area').eq(areau))).run()
    }

    queryDate(table, options){
        return r.table(table).hasFields('parent').orderBy(r.asc('nextMaintenance')).filter(options).limit(1)
    }

    componentGral(table, filter){
        return r.table(table).hasFields('parent').filter(filter) 
    }

    queries(table, options){
        return r.table(table).filter(options).run() 
    }

    queryReport(table, options){
        return r.table('maintenance').eqJoin('componente',r.table('component')).zip().filter({padre:options})
        .pluck("Inactividad","averia","causaRaiz","componentName","ewono","fechaLunes","fechaMantenimiento",
        "noCtrlPat","notas","section","tipoMantenimiento","usuario","vendor").run()
    }

    queryCountGroup(table, options){
        return r.table(table).filter(options).group('componente').count().run()
    }

    listUsers(uname){
        return r.table('user').filter({username : uname}).run()
    }
}

module.exports = Db