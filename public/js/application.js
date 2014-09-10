function _ajaxClient(characterID){
		var ajaxRequest = $.ajax({
			url: '/characters',
			type: 'GET',
			data: {char_id: characterID}
		});
		ajaxRequest.done(function(){console.log('it worked')})
}

function getInput(){
		event.preventDefault();
		var characterID = $("input").val();
		_ajaxClient(characterID);
}

$(document).ready(function () {
	console.log("heY@")
	// $('form').submit(getInput);
	$(document).on("submit", 'form', getInput);



  // Optional - Use AJAX to send an HTTP DELETE request for the sign-out link
});
