$(document).ready(function () {
	console.log("hey")
	// $('form').submit(getInput);
	// $(document).on();
	bindEvents();

});

function bindEvents(){
	console.log("in bindEvents");
	var $container = $(".container");
	$container.on("submit", '.getCharId', getInput);
}

function getInput(){
	console.log("in getInput function");
	event.preventDefault();
	var characterID = $("input").val();
	_ajaxClient(characterID);
}

function _ajaxClient(characterID){
	event.preventDefault();
	var ajaxRequest = $.ajax({
		url: '/characters',
		type: 'GET',
		data: {char_id: characterID}
	});
	ajaxRequest.done(function(){console.log('it worked')})
}


