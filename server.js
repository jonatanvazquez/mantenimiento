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


app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


var Usuario = require('./lib/usuario')
var Componente = require('./lib/componente')
var Mantenimiento = require('./lib/mantenimientos')


var bodyParser = require('body-parser')

app.use(express.static('global'))
app.use(express.static('web/assets'))
app.use(bodyParser.json()) //para aplicaciones json
app.use(bodyParser.urlencoded({extended:true})) //para realizar peticiones tradicionales
app.use(session({
	secret: "7SJUER349KERqdzts",
	resave: false,
	saveUninitialized: false,
	cookie: {expires: new Date(253402300000000)}
}))

var sess
function restringido(req, res, next) {
  if (req.session.usuario) {
    next();
  } else {
    req.session.error = 'Access denied!'
    res.redirect('/')
  }
}

function lunes(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}
function semananumero(date) {
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

	var original = fecha.split("/")
	var inicio = lunes(new Date(original[2], original[1] - 1, original[0]))

	var semanas = Math.ceil(Math.round((hoy-inicio)/ 604800000)/frecuencia)*frecuencia
	if (semanas<=0) {semanas=0}
	inicio.setDate(inicio.getDate()+(7*semanas))
	return inicio
}
 

 // ########################## LOGIN #########################
app.get('/', function (req, res) {
	sess = req.session
	if(sess.usuario) {
	    res.redirect('/maquinas');
	}
	else {
	    res.render('login', {layout: null})
	}
	
})

app.post('/login',async (function(req,res){
  var usuario= new Usuario()
  sess = req.session
  var resultado = await (usuario.consultar({password:req.body.inputPassword,username:req.body.inputUser}))
  if (resultado.length!=0) {
  	sess.rol = resultado[0].rol
  	sess.usuario = resultado[0].username
  	if (resultado[0].rol=='admin') {app.locals.admin='admin'}
  	app.locals.usuario = resultado[0].username
  	app.locals.rol = resultado[0].rol
  	res.redirect('/maquinas');
  }else{
  	res.redirect('/');
  }
}))

app.get('/logout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
  	delete app.locals.usuario
  	delete app.locals.rol
  	delete app.locals.admin
    res.redirect('/');
  }
});
});
// ########################## FIN LOGIN ################################


// ############################ MAQUINAS ##########################
app.get('/maquinas',restringido, async (function(req, res){
	var maquinas= new Componente()
	var mantenimientos = new Mantenimiento()
	var listaequipos=await (maquinas.consultar(function(user) {return user.hasFields("parent").not()}))
	var hoy = lunes(new Date().setHours(0, 0, 0, 0))
	
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
	res.render('home', {layout: 'main',maquinas: listaequipos, semanaActual: semana(hoy)})
}))

app.post('/maquinas',restringido,async (function(req, res){
		var maquinas= new Componente()
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
		if (!equipo[0].parent) {
			res.render('partials/maquina', equipo[0])
		}else{
			res.render('partials/componente', equipo[0])
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
	var listaequipos=await (maquinas.consultar({parent: req.query.id}))
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
	res.render('componentes', {layout: 'main',maquinas: listaequipos, padre: equipo[0], semanaActual: semana(hoy)})
}))

app.get('/detalleComponente',restringido,async (function(req, res){
	var maquinas= new Componente()
<<<<<<< HEAD
	var mantenimientos = new Mantenimiento()
	var equipo=await (maquinas.consultaPadres({id: req.query.id}))
	var mantenimiento =await (mantenimientos.consultar({componente: req.query.id}))
	res.render('detalleComponente', {layout: 'main',equipo: equipo[0].left,padre: equipo[0].right,mantenimientos: mantenimiento})
}))

// ######################## FIN COMPONENTES ####################

// ###################### USUARIOS ##############################
app.get('/usuarios',restringido,async (function(req, res){
	var usuarios= new Usuario()
	var listausuarios=await (usuarios.consultar(1))
	res.render('usuarios', {layout: 'main',usuarios: listausuarios})
}))

app.post('/usuarios',restringido,async (function(req, res){
	var usuarios= new Usuario()
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
=======
	var equipo=await (maquinas.consultaPadres({id: req.query.id}))
	res.render('detalleComponente', {layout: 'main',equipo: equipo[0].left,padre: equipo[0].right})
>>>>>>> origin/master
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
			console.log(err)
			return res.end("");
		}
		res.end(idimagen);
	});
});

// ############## FIN DE CARGA IMAGENES ####################

// #################### MANTENIMIENTOS ############################

app.post('/setMantenimiento',restringido,async (function(req, res){
	var mantenimiento= new Mantenimiento()
	var currentdate = new Date()

	if (req.body.averia) {
		req.body.tipoMantenimiento=req.body.tipo+'2'
	}else{
		req.body.tipoMantenimiento=req.body.tipo+'1'
	}
	if (req.body.tipo=='1') {
		delete req.body.tipo
	}
	req.body.fechaMantenimiento = currentdate.toLocaleString()
	currentdate.setHours(0, 0, 0, 0)
	req.body.fechaLunes=lunes(currentdate)
	// delete req.body.tipo
	// delete req.body.averia
	req.body.usuario = req.session.usuario
	var id = await (mantenimiento.insertar(req.body))
	var agregado=await (mantenimiento.consultar({id: id}))
	agregado[0].layout=null
	res.render('partials/mantenimiento', agregado[0])
}))

app.post('/borrarmantenimiento',restringido,async (function(req, res){
		var mantenimiento= new Mantenimiento()
		await(mantenimiento.eliminar({id:req.body.id}))
		res.send('Eliminado')

}))

// ################ FIN MANTENIMIENTOS ############################

var fs = require('fs');
var pdf = require('html-pdf');
var options = {
		format: 'Tabloid',
		orientation: 'landscape', // portrait or landscape 
		border: {
		    top:'2.5cm',            // default is 0, units: mm, cm, in, px 
		    right:'2.5cm',
		    bottom:'2.5cm',
		    left:'2.5cm'
	  	},
	  	type: 'pdf'
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
app.get('/login',async(function(req, res) {
	// pdf.create(html, options).toFile('./tmp/formatoPDF.pdf', function(err, res) {
	//   if (err) return console.log(err);
	//   	console.log(res); // { filename: '/app/businesscard.pdf' } 
	// });
	// res.send('listo')
	// 
	// 
	var maquinas= new Componente()
<<<<<<< HEAD
	var componentes=await (maquinas.consultaPadres(function(user) {return user.hasFields("parent")}))

	var template = fs.readFileSync("templates/componente.handlebars", "utf8")
	var data = {m : componentes };

	var compileTemplate = handlebars.compile(template);
	var finalPageHTML = compileTemplate(data);
=======
	var padre = await(maquinas.consultar({id:"835c85ca-3b2e-4ea4-9c6f-4722f3d3e8b7"}))
	var hijos = await(maquinas.consultar({parent:"835c85ca-3b2e-4ea4-9c6f-4722f3d3e8b7"}))
	var mantenimientos = new Array()
	hijos.forEach(function(entry){
		var mantenimientos = new Array()
		for(i = 0; i < 52; i++){
			var date = getDateOfISOWeek(i, '2017')
			console.log(date)

			//componente: entry.id, fechaLunes: date
			//if != 0 hay mantenimiento esa semana
			//semanadif == math.round((date-entry.fechaMantenimiento)/604800000) ->diferencia de numero de semanas
			//if (semanadif % entry.frequency) === 0 toca mantenimiento esa semana 
			mantenimientos.push({Inactividad: '10', acumulativo: '99999', causaRaiz: '1', ewono: '12', tipoMantenimiento:'12'})
		}	
	})

	//console.log(hijos)
	//console.log(mantenimientos)
	var template = fs.readFileSync("templates/formatoPDF.handlebars", "utf8")
	var data = {padre: padre[0], listado: hijos, m : mantenimientos}

	var compileTemplate = handlebars.compile(template)
	var finalPageHTML = compileTemplate(data)

	pdf.create(finalPageHTML, options).toFile('./tmp/formatoPDF.pdf', function(err, res) {
		if (err) return console.log(err);
	   	console.log(res);
	 });
>>>>>>> origin/master
	console.log(finalPageHTML)
	res.send('listoo')
}))


/**
 * 
 */
app.listen(3000)