$(document).ready(function () {
	console.log("hey")
	// $('form').submit(getInput);
	// $(document).on();
	bindEvents();

});

function bindEvents(){
	console.log("in bindEvents");
	var $container = $(".container");
	$container.on("submit", '.getChar', getInput);
}

function getInput(){
	console.log("in getInput function");
	event.preventDefault();
	var character = $("input").val();
	_ajaxClient(character);
}

function _ajaxClient(character){
	event.preventDefault();
	var ajaxRequest = $.ajax({
		url: '/characters',
		type: 'GET',
		data: {char_name: character}
	});
	ajaxRequest.done(appendName);
}

function appendName(response){
	console.log('it worked');
	console.log(response);
	// Append link to Thumbnail
	$('.charNames').append('<img src="' + response + '/portrait_fantastic.jpg">');
}


