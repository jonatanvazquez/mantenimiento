/**
 * actua como el server del sistema
 */
var express = require('express')
var app = express()
var session = require('express-session')
var Db = require('./lib/db') 
var db = new Db()
var jsonsafeparse = require('json-safe-parse')
var uuid = require('uuid-base62')
var express = require('express');
var exphbs  = require('express-handlebars');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var handlebars = require('handlebars')
var multer	=	require('multer')
var fs = require('fs')
var json2csv = require('json2csv')
var pdf = require('html-pdf');
var firebase = require('firebase')
var sess
/**
 * Configuración inicial de el proyecto de firebase
 */
firebase.initializeApp({
    apiKey: "AIzaSyB1iRWPkAzoMpRtSNMbYW5O8F8k9fzI6Sw",
    authDomain: "mantenimiento-67c22.firebaseapp.com",
    databaseURL: "https://mantenimiento-67c22.firebaseio.com",
    projectId: "mantenimiento-67c22",
    storageBucket: "mantenimiento-67c22.appspot.com",
    messagingSenderId: "660403769074"
  })


app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

handlebars.registerHelper('verificaRol', function(condicion, options){
/**
 * Verifica el rol del usuario, esta funcion se utiliza en donde verifica el tipo de usuario dentro de las 
 * views y partials
 */
	if(sess){
		if(sess.rol != 'user'){
			return options.fn(true)
		}
	}
})

var Usuario = require('./lib/usuario')
var Componente = require('./lib/componente')
var Mantenimiento = require('./lib/mantenimientos')

var bodyParser = require('body-parser')

app.use(express.static('tmp'))
app.use(express.static('global'))
app.use(express.static('web/assets'))
app.use(bodyParser.json()) //para aplicaciones json
app.use(bodyParser.urlencoded({extended:true})) //para realizar peticiones tradicionales
app.use(session({
	secret: uuid.v4(),
	resave: false,
	saveUninitialized: false,
	cookie: {expires: new Date(253402300000000)}
}))


function restringido(req, res, next) {
  if (req.session.usuario) {
  	sess=req.session
    next();
  } else {
	  
    req.session.error = 'Access denied!'
    res.redirect('/')
  }
}

function lunes(d) {
/**
 * calcula la fecha del día lunes de la fecha indicada
 */
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function semananumero(date) {
/**
 * calcula el numero de la semana del año.
 */
	var day = date.getDate()
	day-=(date.getDay()==0?6:date.getDay()-1)
	day+=7;
	prefixes = ['0', '1', '2', '3', '4', '5'];

  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
  var week=prefixes[0 | (day) / 7]
   return week
}

function semana(date) {
/**
 * calcula el numero de la semana del año.
 */
	var day = date.getDate()
	day-=(date.getDay()==0?6:date.getDay()-1)
	day+=7;
	prefixes = ['0', '1', '2', '3', '4', '5'];

  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]
  var week=prefixes[0 | (day) / 7]+'º Sem de '+monthNames[date.getMonth()]
   return week
}

function siguienteMantenimiento(fecha,frecuencia,hoy){
/** 
*verifica los siguientes mantenimientos a través del inicio
*/
	var original = fecha.split("/")
	var inicio = lunes(new Date(original[2], original[1] - 1, original[0]))

	var semanas = Math.ceil(Math.round((hoy-inicio)/ 604800000)/frecuencia)*frecuencia
	if (semanas<=0) {semanas=0}
	inicio.setDate(inicio.getDate()+(7*semanas))
	return inicio
}

function stringaFecha(fecha){
	var original = fecha.split("/")
	var inicio = lunes(new Date(original[2], original[1] - 1, original[0]))
	return inicio

}
 

 // ########################## LOGIN #########################
app.get('/', function (req, res) {
	if(req.session.usuario) {
	    res.redirect('/maquinas');
	}
	else {
	    res.render('login', {layout: null})
	}
	
})

app.post('/login',async (function(req,res){
  	var usuario= new Usuario()
  	var resultado = await (usuario.consultar({password:req.body.inputPassword,username:req.body.inputUser}))
  	if (resultado.length != 0) {
  		if (resultado[0].rol=='admin') {
			  req.session.admin='admin'
			  req.session.encargado_area = resultado[0].username
			  req.session.encargado_email = resultado[0].email
		}else{
			if(resultado[0].rol=='admin-area'){
				req.session.adminarea='admin-area'
			}
			if(resultado[0].rol=='user'){
				await(usuario.consultar({rol : 'admin-area', area : resultado[0].area}).then(result => {
					req.session.encargado_area = result[0].username
					req.session.encargado_email = result[0].email
				}))
			}
		}
		req.session.email = resultado[0].email
		req.session.usuario = resultado[0].username
		req.session.rol = resultado[0].rol
		req.session.area = resultado[0].area
  		res.redirect('/maquinas');
  	}else{
  		res.redirect('/');
  	}
}))

app.get('/logout',function(req,res){
	if(req.session){
		req.session.destroy(() => {
			//req.session = {}
			res.redirect('/')
		})
	}
});
// ########################## FIN LOGIN ################################

// ############################ VERIFICAR MANTENIMIENTOS ##########################

app.get('/checking-machines', async (function(req, res){
/**
 * Funcion verificadora de los componentes que realizarán cada semana con CronJob
 * el enlace https://www.setcronjob.com/login; usuario: mttosys@gmail.com; pass: x4899954
 */
	var maquinas= new Componente()
	let usuario = new Usuario()
	var mantenimientos = new Mantenimiento()
	var listaequipos = []
	listaequipos = await (maquinas.consultar(function(user) {return user.hasFields("parent").not()}))
	var hoy = lunes(new Date().setHours(0, 0, 0, 0))
	let maqMantenimientos = []
	if (listaequipos.length > 0) {
		let fechaActual = new Date()
		listaequipos.forEach(function(entry) {
		 	await(notificaciones(hoy, fechaActual, entry, maquinas, maqMantenimientos))
		})
		if(maqMantenimientos.length > 0){
			const idInsert = hoy.getDate() + '' + (hoy.getMonth() + 1) + '' + hoy.getFullYear()
			firebase.database().ref('notificaciones/' + idInsert ).set(maqMantenimientos)
		}
	}
	res.send(JSON.stringify(maqMantenimientos))
}))

// ############################ FIN VERIFICAR MANTENIMIENTOS ##########################

app.get('/maquinas',restringido, async(function(req, res){
	var maquinas= new Componente()
	let usuario = new Usuario()
	var mantenimientos = new Mantenimiento()
	var listaequipos = []
	if(req.session.rol == 'admin'){
		await (maquinas.showParents().then(result => {
			listaequipos = result
		}))
	}else{
		await (maquinas.consultarMaquinasUsuario(req.session.area).then(result => {
			listaequipos = result
		}))
	}
	var hoy = lunes(new Date().setHours(0, 0, 0, 0))
	let maqMantenimientos = []
	if (listaequipos.length > 0) {
		let fechaActual = new Date()
		listaequipos.forEach(function(entry) {
		 	await(notificaciones(hoy, fechaActual, entry, maquinas, maqMantenimientos))
			 var fecha = null
			await (maquinas.fecha({parent: entry.id}).then(result => {
				fecha = result
			}))
			if (fecha.length>0) {
				var inicio=siguienteMantenimiento(fecha[0].nextMaintenance,fecha[0].frequency,hoy)
				var cantidadCumplidas=await (mantenimientos.consultarGrupo({fechaLunes: hoy,padre: entry.id}))
				var cantidadComponentes=await (maquinas.consultarSemanales({parent: entry.id}))
			
				if (cantidadCumplidas.length==cantidadComponentes) {
					entry.hecho=true
				}
			
				entry.siguiente=semana(inicio)
				entry.mes=inicio.getMonth()
				entry.semana=semananumero(inicio)
				entry.ano=inicio.getFullYear()
			}
		})
		if(maqMantenimientos.length > 0){
			const idInsert = hoy.getDate() + '' + (hoy.getMonth() + 1) + '' + hoy.getFullYear()
			firebase.database().ref('notificaciones/' + idInsert ).set(maqMantenimientos)
		}
	}
	
	var opts = null
	if (req.session.admin=='admin') {
		if(req.session.rol == 'admin-area'){
			opts = {layout: 'main',maquinas: listaequipos, semanaActual: semana(hoy), adminArea: true, admin:true }
		}else{
			opts = {layout: 'main',maquinas: listaequipos, semanaActual: semana(hoy),admin : true}
		}
	}else{
		if(req.session.rol == 'admin-area'){
			opts = {layout: 'main',maquinas: listaequipos, semanaActual: semana(hoy), adminArea: true }
		}else{
			opts = {layout: 'main',maquinas: listaequipos, semanaActual: semana(hoy)}
		}
	}

	res.render('home', opts) 
}))
// ############################ MAQUINAS ##########################
app.get('/maquinas',restringido, async (function(req, res){
	var maquinas= new Componente()
	let usuario = new Usuario()
	var mantenimientos = new Mantenimiento()
	var listaequipos = []
	if(req.session.rol == 'admin'){
		listaequipos = await (maquinas.consultar(function(user) {return user.hasFields("parent").not()}))
	}else{
		listaequipos = await (maquinas.consultarMaquinasUsuario(req.session.area))
	}
	var hoy = lunes(new Date().setHours(0, 0, 0, 0))
	if (listaequipos.length > 0) {
		let fechaActual = new Date()
		listaequipos.forEach(function(entry) {
			var fecha=await (maquinas.fecha({parent: entry.id}))
			if (fecha.length>0) {
				var inicio=siguienteMantenimiento(fecha[0].nextMaintenance,fecha[0].frequency,hoy)
				var cantidadCumplidas=await (mantenimientos.consultarGrupo({fechaLunes: hoy,padre: entry.id}))
				var cantidadComponentes=await (maquinas.consultarSemanales({parent: entry.id}))
			
				if (cantidadCumplidas.length==cantidadComponentes) {
					entry.hecho=true
				}
			
				entry.siguiente=semana(inicio)
				entry.mes=inicio.getMonth()
				entry.semana=semananumero(inicio)
				entry.ano=inicio.getFullYear()
			}
		})
	}
	
	var opts = null
	if (req.session.admin=='admin') {
		if(req.session.rol == 'admin-area'){
			opts = {layout: 'main',maquinas: listaequipos, semanaActual: semana(hoy), adminArea: true, admin:true  }
		}else{
			opts = {layout: 'main',maquinas: listaequipos, semanaActual: semana(hoy), admin:true }
		}
	}else{
		if(req.session.rol == 'admin-area'){
			opts = {layout: 'main',maquinas: listaequipos, semanaActual: semana(hoy), adminArea: true }
		}else{
			opts = {layout: 'main',maquinas: listaequipos, semanaActual: semana(hoy)}
		}
	}


	res.render('home', opts)
}))

app.post('/maquinas',restringido,async (function(req, res){
		var maquinas= new Componente()
		if (typeof(req.body.nextMaintenance) !== 'undefined') {
			req.body.fechaMantenimiento=stringaFecha(req.body.nextMaintenance)
		}
		if (req.body.id=="") {
			delete req.body.id
			var id = await (maquinas.insertar(req.body))
		}else{
			var id  = req.body.id
			delete req.body.id
			await (maquinas.actualizar({id: id},req.body))
		}
		var equipo=await (maquinas.consultar({id: id}))
		equipo[0].layout=null
		equipo[0].sess=req.session
		if (!equipo[0].parent) {
			res.render('partials/maquina', equipo[0])
		}else{
			res.render('partials/componente',equipo[0])
		}
}))

app.post('/borrar',restringido,async (function(req, res){
		var maquinas= new Componente()
		var mantenimientos = new Mantenimiento()
		await (maquinas.eliminar(function(user) {return user("id").eq(req.body.id).or(user("parent").eq(req.body.id)) }))
		await(mantenimientos.eliminar({componente:req.body.id}))
		res.send('Eliminado')

}))


app.post('/editar',restringido,async (function(req, res){
		var maquinas= new Componente()
		var equipo = await (maquinas.consultar({id: req.body.id}))
		res.send(equipo[0])
}))

// ###################### FIN MAQUINAS ##########################

// ###################### COMPONENTES #########################

app.get('/componentes',restringido,async (function(req, res){
	var maquinas= new Componente()
	var mantenimientos = new Mantenimiento()
	let mid = req.query.id
	let stion = req.query.section 
	var listaequipos=await (maquinas.consultar({parent: mid, section : stion}))
	var equipo=await (maquinas.consultar({id: req.query.id}))
	var hoy = lunes(new Date())
	listaequipos.forEach(function(entry) {
		var inicio=siguienteMantenimiento(entry.nextMaintenance,entry.frequency,hoy)
		var mantenimiento =await (mantenimientos.consultar({componente: entry.id,fechaLunes: inicio}))
		if (mantenimiento.length!=0) {
			entry.hecho=true
		}
    	entry.siguiente=semana(inicio)
    	entry.mes=inicio.getMonth()
    	entry.semana=semananumero(inicio)
    	entry.ano=inicio.getFullYear()
	});
	var opts = null
	if (req.session.admin=='admin') {
		if(req.session.rol == 'admin-area'){
			opts = {layout: 'main',maquinas: listaequipos, padre: equipo[0], semanaActual: semana(hoy), adminArea : true, idP : mid, ss : stion,admin: true}
		}else{
			opts = {layout: 'main',maquinas: listaequipos, padre: equipo[0], semanaActual: semana(hoy), idP : mid, ss : stion,admin: true}
		}
	}else{
		if(req.session.rol == 'admin-area'){
			opts = {layout: 'main',maquinas: listaequipos, padre: equipo[0], semanaActual: semana(hoy), adminArea : true, idP : mid, ss : stion}
		}else{
			opts = {layout: 'main',maquinas: listaequipos, padre: equipo[0], semanaActual: semana(hoy), idP : mid, ss : stion}
		}
	}

	res.render('componentes', opts)
}))

app.get('/detalleComponente',restringido,async (function(req, res){
	var maquinas= new Componente()
	var mantenimientos = new Mantenimiento()
	var equipo=await (maquinas.consultaPadres({id: req.query.id}))
	let sect = equipo[0].left.section
	var mantenimiento =await (mantenimientos.consultar({componente: req.query.id}))
	if (req.session.admin=='admin' || req.session.rol == 'admin-area') {
		res.render('detalleComponente', {layout: 'main',equipo: equipo[0].left,padre: equipo[0].right,
			mantenimientos: mantenimiento,admin:true,seccion : sect})
	}else{
		res.render('detalleComponente', {layout: 'main',equipo: equipo[0].left,padre: equipo[0].right,
			mantenimientos: mantenimiento,sess:req.session,seccion : sect})
	}

}))

// ######################## FIN COMPONENTES ####################

// ######################## SECCIONES ####################

app.get('/secciones',restringido,async (function(req, res){
	const pid = req.query.id
	var maquinas= new Componente()
	var mantenimientos = new Mantenimiento()
	var listaequipos=await (maquinas.consultar({parent: pid}))
	var equipo=await (maquinas.consultar({id: pid}))
	var hoy = lunes(new Date())
	var secciones = []
	if(listaequipos.length > 0){
		listaequipos.forEach(function(entry) {
			let tmp = {
				nombreSeccion : entry.section,
				parent : req.query.id,
				siguiente : '',
    			mes : '',
    			semana : '',
    			ano : '',
				hecho : false
			}
			if(secciones.length > 0){
				if(!findElement(secciones, entry.section)){
					var fecha=await (maquinas.fecha({parent: pid, section : tmp.nombreSeccion}))
					if (fecha.length>0) {
						var inicio=siguienteMantenimiento(fecha[0].nextMaintenance,fecha[0].frequency,hoy)
						var cantidadCumplidas=await (mantenimientos.consultarGrupo({fechaLunes: hoy,padre: pid}))
						var cantidadComponentes=await (maquinas.consultarSemanales({parent: pid, section : tmp.nombreSeccion}))
						if (cantidadComponentes > 0 && cantidadCumplidas.length==cantidadComponentes) {
							tmp.hecho=true
						}
						tmp.siguiente=semana(inicio)
						tmp.mes=inicio.getMonth()
						tmp.semana=semananumero(inicio)
						tmp.ano=inicio.getFullYear()
					}
					secciones.push(tmp)
				}
			}else{
				var fecha=await (maquinas.fecha({parent: pid, section : tmp.nombreSeccion}))
				if (fecha.length>0) {
					var inicio=siguienteMantenimiento(fecha[0].nextMaintenance,fecha[0].frequency,hoy)
					var cantidadCumplidas=await (mantenimientos.consultarGrupo({fechaLunes: hoy,padre: pid}))
					var cantidadComponentes=await (maquinas.consultarSemanales({parent: pid, section : tmp.nombreSeccion}))
					if (cantidadCumplidas.length==cantidadComponentes) {
						tmp.hecho=true
					}
					tmp.siguiente=semana(inicio)
					tmp.mes=inicio.getMonth()
					tmp.semana=semananumero(inicio)
					tmp.ano=inicio.getFullYear()
				}
				secciones.push(tmp)
			}
		})
	}
	var opts = null
	if (req.session.admin=='admin') {
		if(req.session.rol == 'admin-area'){
			opts = {layout: 'main', secciones: secciones, padre: equipo[0], semanaActual: semana(hoy), adminArea : true,admin:true}
		}else{
			opts = {layout: 'main', secciones: secciones, padre: equipo[0], semanaActual: semana(hoy),admin:true}
		}
	}else{
		if(req.session.rol == 'admin-area'){
			opts = {layout: 'main', secciones: secciones, padre: equipo[0], semanaActual: semana(hoy), adminArea : true}
		}else{
			opts = {layout: 'main', secciones: secciones, padre: equipo[0], semanaActual: semana(hoy)}
		}
	}

	res.render('secciones', opts)
}))

app.post('/insertSeccion',restringido,async (function(req, res){
		var maquinas= new Componente()
		if (typeof(req.body.nextMaintenance) !== 'undefined') {
			req.body.fechaMantenimiento=stringaFecha(req.body.nextMaintenance)
		}
		delete req.body.id
		var id = await (maquinas.insertar(req.body))
		var equipo=await (maquinas.consultar({id: id}))
		var todos = await(maquinas.consultar({parent: equipo.parent}))
		var resp = {
			layout : null,
			see : req.session
		}
		if(!findSeccion(todos, equipo[0].section, id)){
			resp.nombreSeccion = equipo[0].section
			resp.parent = equipo[0].parent
			res.render('partials/seccion',resp)
		}else{
			res.send({bien : true})
		}
}))

function findElement(arreglo, elemento){
	var find = false;
	if(arreglo.length > 0){
		var i = 0
		while(!find && (i < arreglo.length)){
			if(arreglo[i].nombreSeccion == elemento){
				find = true
			}else{
				i++
			}
		}
	}
	return find
}

function findSeccion(arreglo, elemento,id){
	var find = false;
	if(arreglo.length > 0){
		var i = 0
		while(!find && (i < arreglo.length)){
			if( (typeof arreglo[i].section != 'undefined') && (arreglo[i].id != id) ){
				if(arreglo[i].section == elemento){
					find = true
				}else{
					i++
				}
			}else{
				i++
			}
		}
	}
	return find
}


// ######################## FIN SECCIONES ####################

// ###################### USUARIOS ##############################
app.get('/usuarios',restringido,async (function(req, res){
	var usuarios= new Usuario()
	let filtro = '1'
	if(req.session.rol == 'admin-area'){
		filtro = {area : req.session.area}
	}
	var listausuarios=await (usuarios.consultar(filtro))
	if (req.session.admin=='admin') {
		res.render('usuarios', {layout: 'main',usuarios: listausuarios,sess:req.session,admin:true})
	}else{
		res.render('usuarios', {layout: 'main',usuarios: listausuarios,sess:req.session})
	}

	
}))

app.post('/usuarios',restringido,async (function(req, res){
	var usuarios= new Usuario()
	if(!req.body.area || req.body.area ==""){
		req.body.area = req.session.area
	}
	if (req.body.id=="") {
		delete req.body.id
		var id = await (usuarios.insertar(req.body))
	}else{
		var id  = req.body.id
		delete req.body.id
		await (usuarios.actualizar({id: id},req.body))
	}
	
	var listausuarios=await (usuarios.consultar({id: id}))
	listausuarios[0].layout=null
	listausuarios[0].sess=req.session
	res.render('partials/usuario', listausuarios[0])
}))

app.post('/borrarusuario',restringido,async (function(req, res){
		var usuarios= new Usuario()
		await(usuarios.eliminar({id:req.body.id}))
		res.send('Eliminado')

}))

app.post('/editarusuario',restringido,async (function(req, res){
		var usuarios= new Usuario()
		var usuario = await (usuarios.consultar({id: req.body.id}))
		res.send(usuario[0])

}))
 // ################ FIN USUARIOS #############################



// ################## CARGA DE IMAGENES ##########################

app.post('/subirimagen',restringido,function(req,res){
	var idimagen=uuid.v4()
	var storage	=	multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, './global/uploads');
	  },
	  filename: function (req, file, callback) {
	    callback(null, '' + idimagen + '.jpg');
	  }
	});
	var upload = multer({ storage : storage}).single('imagen');
	upload(req,res,function(err) {
		if(err) {
			return res.end("");
		}
		res.end(idimagen);
	});
});

app.post('/subirDoc',restringido,function(req,res){
	var idDoc=uuid.v4() 
	var completo = ''
	var storage	=	multer.diskStorage({
	  destination: function (req, file, callback) {
	    callback(null, './global/uploads');
	  },
	  filename: function (req, file, callback) {
		  const ind = file.originalname.lastIndexOf('.')
		  const ext = file.originalname.substring(ind, file.originalname.length)
		  const name = idDoc + ext
		  completo = name
		  callback(null, name);
	  }
	});
	var upload = multer({ storage : storage}).single('documento');
	upload(req,res,function(err) {
		if(err) {
			return res.end("");
		}
		res.end(completo)
	})
})

// ############## FIN DE CARGA IMAGENES ####################

// #################### MANTENIMIENTOS ############################

app.post('/setMantenimiento',restringido,async (function(req, res){
	var mantenimiento = new Mantenimiento()
	var componente = new Componente()
	var currentdate =  null
	if (req.body.averia) {
		req.body.tipoMantenimiento= '3'
	}else{
		req.body.tipoMantenimiento=req.body.tipo
	}
	if(req.body.tipo == '4'){
		delete req.body.tipo
	}
	if(req.body.anterior && req.body.anterior != ''){
		let fecha = req.body.anterior.split('/');
		currentdate = new Date(fecha[2],fecha[1]-1,fecha[0]); 
		req.body.fechaMantenimiento = currentdate.toLocaleString()
	}else{
		currentdate =  new Date()
		req.body.fechaMantenimiento = currentdate.toLocaleString()
	}
	if(req.body.anterior){
		delete req.body.anterior 
	}
	currentdate.setHours(0, 0, 0, 0)
	req.body.fechaLunes=lunes(currentdate)

	req.body.usuario = req.session.usuario
	var id = await (mantenimiento.insertar(req.body))
	var agregado=await (mantenimiento.consultar({id: id}))

	agregado[0].layout=null
	agregado[0].sess=req.session
	res.render('partials/mantenimiento', agregado[0])
}))

app.post('/borrarmantenimiento',restringido,async (function(req, res){
		console.log(req.body)
		var mantenimiento= new Mantenimiento()
		await(mantenimiento.eliminar({id:req.body.id}))
		res.send('Eliminado')
}))

// ################ FIN MANTENIMIENTOS ############################

var options = {
		"format" : "Tabloid",
		"orientation" : "landscape", // portrait or landscape 
		"border" : {
		    "top" : "2.5cm",            // default is 0, units: mm, cm, in, px 
		    "right" : "1.9cm",
		    "bottom" : "4.2cm",
		    "left" : "1.9cm"
	  	},
	  	"type" : "pdf"
	}

function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

function getImgMantenimiento(tipo){
	var urlImg = 'file://' + __dirname + '/global/photos/'
	switch(tipo){
		case '1': urlImg += '1.png' 
		break
		case '4': urlImg += '4.png'  
		break
		case '3': urlImg += '3.png' 
		break
		case '2': urlImg += '2.png' 
		break
		default: urlImg += 'default.png' 
		break
	}
	return urlImg
}

app.post('/generarPDF',async(function(req, res) {

	var maquinas= new Componente()
	var mantenimiento = new Mantenimiento()
	var padre = await(maquinas.consultar({id:req.body.maquina}))
	var hijos = await(maquinas.consultar({parent:req.body.maquina}))
	
	var anio = req.body.anio

	hijos.forEach(function(entry){
		var mantenimientos = new Array()
		for(i = 1; i <= 52; i++){
			var date = getDateOfISOWeek(i, anio)

			var dato = {
				Inactividad: '', 
				acumulativo: '', 
				causaRaiz: '', 
				ewono: '', 
				tipoMantenimiento:'',
				imgMantenimiento: ''
			}

			var componente = await(mantenimiento.consultar({componente:entry.id, fechaLunes: date}))
			
			if(componente.length != 0){
				dato.Inactividad = componente[0].Inactividad
				dato.causaRaiz =  componente[0].causaRaiz
				dato.ewono =  componente[0].ewono
				dato.tipoMantenimiento =  componente[0].tipoMantenimiento
			}
			var semanadif = Math.round((date-entry.fechaMantenimiento)/604800000)

			if ((semanadif % entry.frequency) === 0){
				if(dato.tipoMantenimiento == ''){
					dato.tipoMantenimiento = '1'
				}
			}else{
				if(dato.tipoMantenimiento == ''){
					dato.tipoMantenimiento = '10'
				}
			} 

			dato.imgMantenimiento = getImgMantenimiento(dato.tipoMantenimiento)
			mantenimientos.push(dato)
		}

		var amEstandar = ''
		var mEncendida = 'Maquina Apagada'

		if(typeof(entry.inspeccion) !== 'undefined'){
			amEstandar += 'Inspección '
		}

		if(typeof(entry.limpieza) !== 'undefined'){
			amEstandar += 'Limpieza '
		}
		
		if(typeof(entry.ajuste) !== 'undefined'){
			amEstandar += 'Ajuste'
		}
		
		if(typeof(entry.mEncendida) !== 'undefined'){
			mEncendida = 'Maquina Encendida'
		}

		var imgc = ''
		var imgu = ''

		if(entry.componentImg !== ''){
			imgc = 'file://' + __dirname + '/global/uploads/' + entry.componentImg + '.jpg'
		}else{
			imgc = 'file://' + __dirname + '/global/photos/sin-imagen.jpg'
		}

		if(entry.componentImgu !== ''){
			imgu = 'file://' + __dirname + '/global/uploads/' + entry.componentImgu + '.jpg'
		}else{
			imgu = 'file://' + __dirname + '/global/photos/sin-imagen.jpg'
		}

		entry.imgc = imgc
		entry.imgu = imgu
		entry.mEncendida = mEncendida
		entry.amEstandar = amEstandar
		entry.mantenimiento = mantenimientos
	})

	var i = 'file://' + __dirname + '/global/photos/inst.jpg'
	var template = fs.readFileSync("templates/formatoPDF.handlebars", "utf8")
	var data = {padre: padre[0], listado: hijos, a : anio, inst : i}
	var compileTemplate = handlebars.compile(template)
	var finalPageHTML = compileTemplate(data)

	pdf.create(finalPageHTML, options).toFile('./tmp/formatoPDF.pdf', function(err, res) {
		if (err) return console.log(err);
	 });

	res.send('http://'+req.get('host')+'/formatoPDF.pdf')
}))

app.post('/generarExcel',async(function(req, res) {
	var mantenimiento = new Mantenimiento()
	var datos = await(mantenimiento.consultarReporte(req.body.maquina))
	
	var fields = ["Inactividad","averia","causaRaiz","componentName","ewono","fechaLunes","fechaMantenimiento","noCtrlPat","notas","section","tipoMantenimiento","usuario","vendor"];
	var csv = json2csv({ data: datos, fields: fields });
	 
	fs.writeFile('tmp/reporte.csv', csv, function(err) {
	  if (err) throw err;
	});
	res.send('http://'+req.get('host')+'/reporte.csv')
	//"Tiempo de Inactividad","causaRaiz","componente","ewono","fechaLunes","fechaMantenimiento","id","notas","padre","tipoMantenimiento","usuario"
}))

// #################### FUNCIONES GENERALES ############################

function notificaciones(hoy, fechaActual, objeto, maquinas, maqMantenimientos){
	/**
	 * Crea el calculo de los equipos que se tienen mantenimiento esta semana y se tienen que enviar por correo, 
	 * cada semana.
	 */
	if(hoy.getDate() == fechaActual.getDate()){ //revisa cada lunes que mantenimientos toca en esta semana
		let cInternos = await(maquinas.getComponentes({parent: objeto.id}))
		const idInsert = hoy.getDate() + '' + (hoy.getMonth() + 1) + '' + hoy.getFullYear()
		if(cInternos.length > 0){
			finsemana = hoy.getDate() + 5
			cInternos.forEach(pInterno => {
				let interno = pInterno.nextMaintenance.split('/')
				if( (interno[2] == hoy.getFullYear()) && (interno[1] == (hoy.getMonth() + 1)) 
					&& (interno[0] >= hoy.getDate()) && (interno[0] <= finsemana) ){
					maqMantenimientos.push({
						nombre : pInterno.componentName,
						seccion : pInterno.section,
						fecha : pInterno.nextMaintenance,
						parent :  objeto.componentName,
						correo_area : req.session.encargado_email,
						nombre_area : req.session.encargado_area,
						area : objeto.area
					})
				}
			})
		}
	}
}

// ############## FIN DE FUNCIONES GENERALES ####################

app.listen(3000)
