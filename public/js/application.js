$(document).ready(function () {
	console.log("hey")

	bindEvents();

});

function bindEvents(){
	// console.log("in bindEvents");
	var $container = $(".container");
	$container.on("submit", '.getChar', getInput);
}

function getInput(){
	// console.log("in getInput");
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
	// console.log(response);

	//  Clear dom elements inside appendedEls div and clear input
	$('.appendedEls').empty();
	$('.char_name').val('');

	// Append empty divs so can append name, thumbnail, series 
	$('.appendedEls').append('<div class="charName"> </div>');
	$('.appendedEls').append('<div class="charThumb"> </div>');
	$('.appendedEls').append('<div class="series"> </div>');

	// Append name, thumbnail, series
	$('.charName').append('<h2>' + response.name + '</h2>');
	$('.charThumb').append('<img src="' + response.thumbnail + '/portrait_fantastic.jpg">');
	
	for (var i=0; i < response.series.length; i++){
		$('.series').append('<p>'+response.series[i]+'</p>');
	}
}


