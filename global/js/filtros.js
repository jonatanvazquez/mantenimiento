	$(document).ready(function() {
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
		function completados(){
			userList.filter(function(item) {
			   if (item.values().hecho != 'true') {
			       return true;
			   } else {
			       return false;
			   }
			}); 
		}
		function semanas(){
			var hoy = semana(lunes(new Date().setHours(0, 0, 0, 0)))

			userList.filter(function(item) {
			   if (item.values().semana != hoy) {
			       return false;
			   } else {
			       return true;
			   }
			}); 
		}
		function ambos(){
		var hoy = semana(lunes(new Date().setHours(0, 0, 0, 0)))

		userList.filter(function(item) {
		   if (item.values().semana != hoy) {
		       return false;
		   } else {
		       if (item.values().hecho != 'true') {
		           return true;
		       } else {
		           return false;
		       }
		   }
		}); 
	}

	var options = {
	  valueNames: [ 'nombre' ,'hecho', 'semana']
	}

	var userList = new List('main', options);
	function lunes(d) {
	  d = new Date(d);
	  var day = d.getDay(),
	      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
	  return new Date(d.setDate(diff));
	}
	ambos();
	
	if(localStorage.getItem("tareas")!='true' && localStorage.getItem("semanas")!='true'){
			console.log('los dos')
			console.log(localStorage.getItem("tareas"))
			console.log(localStorage.getItem("semanas"))
			setTimeout(function() {
			    $('#tareas').trigger('click');
			    $('#semanas').trigger('click');
			}, 100);
			
		}else if(localStorage.getItem("tareas")!='true'){
			setTimeout(function() {
				$('#tareas').trigger('click');
			}, 100);
		}else if(localStorage.getItem("semanas")!='true'){
			setTimeout(function() {
				$('#semanas').trigger('click');
			}, 100);
		}
	
		
      $('.filtros').change(function() {
      	console.log('click');
      	if ($('#tareas').prop('checked') === true && $('#semanas').prop('checked') === true) {
      		ambos();
      		console.log('oculta todo')
      		localStorage.setItem("tareas", 'true');
      		localStorage.setItem("semanas", 'true');
      		//console.log(sessionStorage.getItem("tareas"))
      	}else if($('#tareas').prop('checked') === true){
      		completados();
      		console.log('oculta tareas')
      		localStorage.setItem("tareas", 'true');
      		localStorage.setItem("semanas", 'false');
      		console.log(localStorage.getItem("semanas"));
      	}else if($('#semanas').prop('checked') === true){
      		semanas();
      		console.log('oculta semanas')
      		localStorage.setItem("tareas", 'false');
      		localStorage.setItem("semanas", 'true');
      	}else{
      		userList.filter();
      		console.log('oculta nada')
      		localStorage.setItem("tareas", 'false');
      		localStorage.setItem("semanas", 'false');
      	}

      });

      });