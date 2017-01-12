
function enviarmaquina(){
	if ($('#componentName').val()!='') {
	var data=$("#nuevamaquina").find('input[name!=imagen]').serialize()
	$.post('/maquinas', data, function(resp) {
    	location.reload();
    	$('.modal').modal('hide');
    });
	}else{
		alert('Debes agregar un Nombre')
	}
}

  $(document).ready(function() {
  	
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
		  }
		});
		}else{
			alert('Debes cargar una Imagen tipo jpg')
		}
  
	});
});

