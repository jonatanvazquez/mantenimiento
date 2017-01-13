
function enviarmaquina(){
	if ($('#componentName').val()!='') {
	var data=$("#nuevamaquina").find('input[name!=imagen]').serialize()
	$.post('/maquinas', data, function(resp) {
		if ($('#id').val()!='') {
			$("button[setid='"+$('#id').val()+"']").closest('li').remove();
		}
		$('[data-plugin="animateList"]').append(resp);
    	$('.modal').modal('hide');
    });
	}else{
		alert('Debes agregar un Nombre')
	}
}

  $(document).ready(function() {


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
        $('#addProjectForm').on('hidden.bs.modal', function () {
        	$('#titulo').html('AGREGAR NUEVA MAQUINA');
        	$('#tituloc').html('AGREGAR COMPONENTE');
			$('#guardar').html('Crear');
			$('#nuevamaquina').trigger("reset");
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

});

