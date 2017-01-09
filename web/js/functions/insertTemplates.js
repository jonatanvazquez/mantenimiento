var $ = require('jquery');

function insertMenu(){
	$(document).ready(function(){
		$(document).append(getMainMenu());
	});
}