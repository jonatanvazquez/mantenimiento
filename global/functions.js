



function enviarmaquina(){
	if ($('#componentName').val()!='') {
		if ($('#nextMaintenance').length != 0 && $('#nextMaintenance').val()=='') {
			swal("Error", "Debes Registrar una Fecha!", "warning");
		}else{
			var data=$("#nuevamaquina").find('input[name!=imagen]').serialize()
			$.post('/maquinas', data, function(resp) {
				if ($('#id').val()!='') {
					$("button[setid='"+$('#id').val()+"']").closest('li').remove();
					swal("Cambio Correcto!", "Maquina Actualizada!", "success");
				}else{
					swal("Registro Correcto!", "Maquina Agregada!", "success");
				}
				$('[data-plugin="animateList"]').append(resp);
		    	$('.modal').modal('hide');
		    });
		}
	}else{
		swal({
          title: "Error",
          text: "Debes agregar un Nombre",
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Entiendo!',
          closeOnConfirm: true
        });
	}
}

function registrarusuario(){
	if ($('#username').val()!='') {
	var data=$("#nuevamaquina").serialize()
	$.post('/usuarios', data, function(resp) {
		if ($('#id').val()!='') {
			$("button[setid='"+$('#id').val()+"']").closest('tr').remove();
			swal("Cambio Correcto!", "Usuario Agregado!", "success");
		}else{
			swal("Registro Correcto!", "Usuario Agregado!", "success");
		}
		$('#usuarios').append(resp);
    	$('.modal').modal('hide');
    });
	}else{
		swal({
          title: "Error",
          text: "Debes agregar un Nombre",
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Entiendo!',
          closeOnConfirm: true
        });
	}
}

function registrarmantenimiento(){
	if ($('#tipo').val()!='') {
      swal({
          title: "¿Confirmas el Registro de Mantenimiento?",
          text: "Recuerda que no se podrá modificar ni borrar el registro",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Si, Registrarlo!',
          closeOnConfirm: false
        },
        function() {
	  		var data=$("#nuevomantenimiento").serialize()
	  		$.post('/setMantenimiento', data, function(resp) {
	  			swal("Registro Correcto!", "Mantenimiento Registrado!", "success");
	  			$("#nuevomantenimiento")[0].reset();
	  			$('#listamantenimientos').prepend(resp);
	  	    	$('.modal').modal('hide');
	  	    });
        });

  	}else{
		swal({
          title: "Error",
          text: "Debes agregar un tipo de Mantenimiento",
          type: "warning",
          showCancelButton: false,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Entiendo!',
          closeOnConfirm: true
        });
	}

}

  $(document).ready(function() {

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
        $(document).on('click', '[data-tag=project-delete]', function (e) {
        	var miid=$(this).attr('setid');

          bootbox.dialog({
            message: 'Deseas Eliminar este Elemento?',
            buttons: {
              success: {
                label: 'Delete',
                className: 'btn-danger',
                callback: function callback() {
                	console.log(miid);
                	$.ajax({
					  type: "POST",
					  url: "/borrar",
					  data: {"id": miid},
					  success: function(data) {
						$(e.target).closest('li').remove();
					  }
					});
                  
                }
              }
            }
          });
        });

        $(document).on('click', '[data-tag=user-delete]', function (e) {
        	var miid=$(this).attr('setid');

          bootbox.dialog({
            message: 'Deseas Eliminar este Usuario?',
            buttons: {
              success: {
                label: 'Delete',
                className: 'btn-danger',
                callback: function callback() {
                	console.log(miid);
                	$.ajax({
					  type: "POST",
					  url: "/borrarusuario",
					  data: {"id": miid},
					  success: function(data) {
						$(e.target).closest('tr').remove();
					  }
					});
                  
                }
              }
            }
          });
        });
        $(document).on('click', '[data-tag=mantenimiento-delete]', function (e) {
        	var miid=$(this).attr('setid');

          bootbox.dialog({
            message: 'Deseas Eliminar este Mantenimiento?',
            buttons: {
              success: {
                label: 'Delete',
                className: 'btn-danger',
                callback: function callback() {
                	console.log(miid);
                	$.ajax({
					  type: "POST",
					  url: "/borrarmantenimiento",
					  data: {"id": miid},
					  success: function(data) {
						$(e.target).closest('tr').remove();
					  }
					});
                  
                }
              }
            }
          });
        });
        $('#addProjectForm').on('hidden.bs.modal', function () {
        	$('#titulo').html('AGREGAR NUEVA MAQUINA');
        	$('#tituloc').html('AGREGAR COMPONENTE');
			$('#guardar').html('Crear');
			$('#nuevamaquina')[0].reset();
			$('#id').val("");
			$('#componentImg').val("");
		});
        $(document).on('click', '[data-tag=project-edit]', function (e) {
        var miid=$(this).attr('setid');
            console.log(miid);
            $.ajax({
				type: "POST",
				url: "/editar",
				data: {"id": miid},
				success: function(data) {
					console.log(data)
					$('#nuevamaquina').formParams(data);
					$('#titulo').html('EDITAR MAQUINA');
					$('#tituloc').html('EDITAR COMPONENTE');
					$('#guardar').html('Guardar');
					$('#addProjectForm').modal('show');
				}
			});

        });

        $(document).on('click', '[data-tag=user-edit]', function (e) {
        var miid=$(this).attr('setid');
            console.log(miid);
            $.ajax({
				type: "POST",
				url: "/editarusuario",
				data: {"id": miid},
				success: function(data) {
					console.log(data)
					$('#nuevamaquina').formParams(data);
					$('#tituloc').html('EDITAR USUARIO');
					$('#guardar').html('Guardar');
					$('#addProjectForm').modal('show');
				}
			});

        });
  	
  	$('#imagen').change(function() {
  		var filename = $("#imagen").val();
        var extension = filename.replace(/^.*\./, '');
  		if (extension=="jpg") {
  		var fd = new FormData();
  		fd.append('imagen', $("#imagen").get(0).files[0]);
		 $.ajax({
		  type: "POST",
		  url: "/subirimagen",
		  contentType: false,
    	  processData: false,
		  data: fd,
		  success: function(data) {
			$('#componentImg').val(data);
			$('#nimagen').val(filename.substr(filename.lastIndexOf('\\') + 1));
		  }
		});
		}else{
			alert('Debes cargar una Imagen tipo jpg')
		}
  
	});

  	$('#imagenu').change(function() {
  		var filename = $("#imagenu").val();
        var extension = filename.replace(/^.*\./, '');
  		if (extension=="jpg") {
  		var fd = new FormData();
  		fd.append('imagen', $("#imagenu").get(0).files[0]);
		 $.ajax({
		  type: "POST",
		  url: "/subirimagen",
		  contentType: false,
    	  processData: false,
		  data: fd,
		  success: function(data) {
			$('#componentImgu').val(data);
			$('#nimagenu').val(filename.substr(filename.lastIndexOf('\\') + 1));
		  }
		});
		}else{
			alert('Debes cargar una Imagen tipo jpg')
		}
  
	});

});

