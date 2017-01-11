
function enviarmaquina(){
	var data=$("#nuevamaquina").serialize()
	$.post('/maquinas', data, function(resp) {
    	alert(resp);
    });
}

