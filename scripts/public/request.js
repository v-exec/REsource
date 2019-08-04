var apiPath = 'https://exp.v-os.ca/resource/scripts/private/api.php';

function request(type, callback) {
	//create request
	var xhr = new XMLHttpRequest();
	xhr.open('POST', apiPath, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
		if (xhr.status === 200) {
			//handle response
			callback(xhr.responseText);
		}
		else {
			//handle error
			console.log('Network error trying to read logs.');
		}
	};

	//determine query (type, data, id)
	var query;

	switch(type) {
		case 'newLog':
			//
			break;

		case 'newSector':
			//
			break;

		case 'newStorage':
			//
			break;

		case 'modifyLog':
			//
			break;

		case 'modifySector':
			//
			break;

		case 'modifyStorage':
			//
			break;

		case 'deleteLog':
			//
			break;

		case 'deleteSector':
			//
			break;

		case 'deleteStorage':
			//
			break;

		case 'readAll':
			query = type;
			break;

		case 'verifyLogin':
			query = type;
			break;
	}

	//send request
	xhr.send(encodeURI(prepareRequest() + query));
}

//create token queries for user verification and add query type
function prepareRequest() {
	var back = getCookie('back');
	var front = document.getElementById('front').className;
	return 'back=' + back + '&front=' + front + '&pass=' + password + '&type=';
}

//create cookie
function setCookie(name, value, expiryDays) {
	var d = new Date();
	d.setTime(d.getTime() + (expiryDays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

//get cookie
function getCookie(cookie) {
	var name = cookie + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');

	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];

		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}

		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}

	return false;
}

//prevents safari from doing its scrolling bullshit - probably
function handleFormClick(e) {
	e.preventDefault();
}