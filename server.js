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
	saveUninitialized: false
}))

 
app.get('/', function (req, res) {
	fs.readFile('./web/html/pages/index.html', function(err, html){
		var html_str = html.toString();
		res.send(html_str)
	})
})

app.post('/maquinas',async (function(req, res){
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
		if (!equipo[0].parent) {
			res.render('maquina', {layout: null,maquinas: equipo})
		}else{
			res.render('componente', {layout: null,maquinas: equipo})
		}
}))

app.post('/borrar',async (function(req, res){
		var maquinas= new Componente()
		console.log(req.body.id)
		var id = await (maquinas.eliminar(function(user) {return user("id").eq(req.body.id).or(user("parent").eq(req.body.id)) }))

		res.send('Eliminado')

}))

app.post('/editar',async (function(req, res){
		var maquinas= new Componente()
		console.log(req.body.id)
		var equipo = await (maquinas.consultar({id: req.body.id}))
		res.send(equipo[0])

}))

app.get('/maquinas',async (function(req, res){
	var maquinas= new Componente()
	var listaequipos=await (maquinas.consultar(function(user) {return user.hasFields("parent").not()}))
	res.render('home', {layout: 'main',maquinas: listaequipos})
}))


app.get('/componentes',async (function(req, res){
	var maquinas= new Componente()
	var listaequipos=await (maquinas.consultar({parent: req.query.id}))
	var equipo=await (maquinas.consultar({id: req.query.id}))
	res.render('componentes', {layout: 'main',maquinas: listaequipos, padre: equipo[0]})
}))

app.get('/detalleComponente',async (function(req, res){
	var maquinas= new Componente()
	var equipo=await (maquinas.consultaPadres({id: req.query.id},"parent", r.table(tabla)))
	res.render('detalleComponente', {layout: 'main',equipo: equipo[0].left,padre: equipo[0].right})
}))

app.post('/subirimagen',function(req,res){
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


app.get('/setMantenimiento',async (function(req, res){
	var maquinas= new Componente()
	var equipo=await (maquinas.consultaPadres({id: req.query.id}))
	res.render('setMantenimiento', {layout: 'main',equipo: equipo[0].left,padre: equipo[0].right})
}))

var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./web/html/pages/formatoPDF.html', 'utf8');
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

app.get('/login',async(function(req, res) {
	// pdf.create(html, options).toFile('./tmp/formatoPDF.pdf', function(err, res) {
	//   if (err) return console.log(err);
	//   	console.log(res); // { filename: '/app/businesscard.pdf' } 
	// });
	// res.send('listo')
	var maquinas= new Componente()
	var componentes=await (maquinas.consultaPadres(function(user) {return user.hasFields("parent")},"parent", r.db('mantenimiento').table("component"))

	var template = fs.readFileSync("templates/componente.handlebars", "utf8")
	var data = {m : componentes };

	var compileTemplate = handlebars.compile(template);
	var finalPageHTML = compileTemplate(data);
	console.log(finalPageHTML)
}))


/**
 * 
 */
app.listen(3000)