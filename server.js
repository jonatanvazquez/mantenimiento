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
var express = require('express')
var exphbs  = require('express-handlebars')
var async = require('asyncawait/async')
var await = require('asyncawait/await')


app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


var Usuario = require('./lib/usuario')
var Componente = require('./lib/componente')
var Mantenimiento = require('./lib/mantenimientos')

/**
 * Acciones sobre los archivos [lectura, escritura, eliminar, actualizar]
 */

var fs = require('file-system')

/**
 * Lee los parametros que envia un formulario
 */
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
		var id = await (maquinas.addComponent(req.body))
		res.send(id)
}))

app.get('/maquinas',async (function(req, res){
	var maquinas= new Componente()
	var listaequipos=await (maquinas.consultar(1))
	console.log(listaequipos)
	res.render('home', {layout: 'main',maquinas: listaequipos})
}))


app.get('/componentes',async (function(req, res){
	var maquinas= new Componente()
	var listaequipos=await (maquinas.consultar({parent: req.query.id}))
	res.render('componentes', {layout: 'main',maquinas: listaequipos, padre: req.query.id})
}))

app.get('/detalleComponente',async (function(req, res){
	var maquinas= new Componente()
	var equipo=await (maquinas.consultaPadres({id: req.query.id}))
	res.render('detalleComponente', {layout: 'main',equipo: equipo[0].right,padre: equipo[0].left})
}))

app.get('/setMantenimiento',function(req, res){
	fs.readFile('./web/html/pages/setMantenimiento.html', function(err, html){
		var html_str = html.toString()
		res.send(html_str)
	})
})

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

app.get('/login',function(req, res) {
	pdf.create(html, options).toFile('./tmp/formatoPDF.pdf', function(err, res) {
	  if (err) return console.log(err);
	  	console.log(res); // { filename: '/app/businesscard.pdf' } 
	});
	res.send('listo')
})


/**
 * 
 */
app.listen(3000)