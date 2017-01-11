var page= require('page');

var main = document.getElementById('main')

page('/maquinas',function(ctx,next){
	main.innerHTML = `   `;
})

page('/componentes',function(ctx,next){
	main.innerHTML = `    `;
})
page();