$(document).ready(function () {
	console.log("hey")

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
		data: {char_name: character},
		dataType: "json"
	});
	ajaxRequest.done(appendElements);
}

function appendElements(response){
	console.log('it worked');
	console.log(response);
	console.log(response.thumbnail);
	console.log(response.series1);
	console.log(response.series2);
	console.log(response.name);

	$('.charName').append(response.name);
	// Append link to Thumbnail
	$('.charThumb').append('<img src="' + response.thumbnail + '/portrait_fantastic.jpg">');
	$('.series').append(response.series1, "<br>", response.series2);
	// $('.series').append(response.series1);
	// $('.series').append(response.series2);
}


