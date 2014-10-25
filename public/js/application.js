$(document).ready(function () {
	bindEvents();

});

function bindEvents(){
	var $container = $(".container");
	$container.on("submit", '.getChar', getInput);
}

function getInput(){
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
	ajaxRequest.fail(responseFail);
}

function appendElements(response, status){
	//  Clear dom elements inside appendedEls div and clear input
	$('.appendedEls').empty();
	$('.char_name').val('');

	// Append empty divs so can append name, thumbnail, desc, series 
	$('.appendedEls').append('<div class="charName"> </div>');
	$('.appendedEls').append('<div class="charThumb"> </div>');
	$('.appendedEls').append('<div class="description"> </div>');
	$('.appendedEls').append('<div class="series_num"> </div>');
	$('.appendedEls').append('<div class="series"> </div>');

	// Append name, thumbnail, desc, series
	$('.charName').append('<h2>' + response.name + '</h2>');
	$('.charThumb').append('<img src="' + response.thumbnail + '/portrait_fantastic.jpg">');
	$('.description').append('<h5>' + response.description + '</h5>');
	$('.series_num').append('<h3> Appears in: ' + response.series_num + ' different Marvel series! </h3>');

	$('.series').append('<h4> Here\'s some to get you started: </h4>');

	
	for (var i=0; i < response.series.length; i++){
		$('.series').append('<p>'+response.series[i]+'</p>');
	}
}

function responseFail(response, status){	
	// Displays error message to user if character is not found
	if (response.status == 404){
		$('.char_name').val('');
		$('.appendedEls').empty();
		$('.appendedEls').append('<p>This character does not exist in the Marvel Comics API, please try a different character.</p>');	
	}
}

