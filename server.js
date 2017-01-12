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
var multer	=	require('multer')
var fs = require('fs')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


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
		var id = await (maquinas.insertar(req.body))
		res.send(id)
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
	var equipo=await (maquinas.consultaPadres({id: req.query.id}))
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


app.get('/setMantenimiento',function(req, res){
	fs.readFile('./web/html/pages/setMantenimiento.html', function(err, html){
		var html_str = html.toString()
		res.send(html_str)
	})
})

app.get('/login',function(req, res) {
	var maquinas= new Componente()
	maquinas.consultar(1)
	res.send('LISTO')
})


/**
 * 
 */
app.listen(3000)