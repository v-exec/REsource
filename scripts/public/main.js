// INITIALIZATION

window.onload = function() {
	//check if login cookie exists to avoid repeated login
	if (getCookie('loginPassword')) {
		password = getCookie('loginPassword');
		request('verifyLogin', function(r) {
			if (r === 'true') successfulLogin();
		});
	}

	//load login window
	loginWindow.style.display = 'block';
	loginWindow.style.opacity = 1;
}

//login on enter keypress
function login(e) {
	if (e.keyCode == 13) {
		e.preventDefault();
		password = passwordInput.value;
		passwordInput.value = null;
		loginFeedback.innerHTML = '';

		request('verifyLogin', function(r) {
			if (r === 'true') successfulLogin();
			else loginFeedback.innerHTML = 'incorrect password';
		});
	}
}

function successfulLogin() {
	//add login cookie to avoid repeated login
	setCookie('loginPassword', password, 2);

	//get rid of login html elements
	loginWindow.style.opacity = 0;

	setTimeout(function() {
		loginWindow.style.display = 'none';
		loginHider.style.transform = 'translateY(100%)';
	}, 1000);

	setTimeout(function() {
		loginHider.style.display = 'none';
	}, 2000);

	//populate screens with content
	//load logs, sectors, and storages
	request('readAll', function(r) {
		var parse = JSON.parse(r);

		var jsonLogs = parse.logs;
		var jsonSectors =  parse.sectors;
		var jsonStorages = parse.storages;

		//create objects from JSON data
		for (var i = 0; i < jsonSectors.length; i++) {
			sectors.push(new Sector(jsonSectors[i].name, jsonSectors[i].icon, jsonSectors[i].color));
			refreshSectorList();
		}

		for (var i = 0; i < jsonStorages.length; i++) {
			storages.push(new Storage(jsonStorages[i].name, jsonStorages[i].icon, jsonStorages[i].color));
			refreshStorageList();
		}

		for (var i = 0; i < jsonLogs.length; i++) {
			logs.push(new Log(jsonLogs[i].amount, jsonLogs[i].currency, jsonLogs[i].type, jsonLogs[i].source, jsonLogs[i].destination, jsonLogs[i].fee, jsonLogs[i].date, jsonLogs[i].time, jsonLogs[i].sector, jsonLogs[i].id));
			refreshLogList();
		}

		//create options in dropdown lists
		refreshOptions();

		//create colors and icons in pickers
		createColors();
		createIcons();

		//set currency placeholder in settings
		if (getCookie('currency')) currency = getCookie('currency');
		currencySetting.placeholder = currency;

		//create tracking graph
		refreshTracking();

		//update stats
		updateStats();
	});
}

// EVENT LISTENERS

//switch screens between track and log
trkButton.addEventListener('click', function() {
	if (!isTracking) switchScreen(true);
});

logButton.addEventListener('click', function() {
	if (isTracking) switchScreen(false);
});

//open and close set menu
setButton.addEventListener('click', function() {
	if (colorOpen) {
		closeColorPicker();
		setButtonText.style.transform = 'translate(-50%, -50%) rotate(' + (winding += 90) +'deg)';
		return;
	}

	if (iconOpen) {
		closeIconPicker();
		setButtonText.style.transform = 'translate(-50%, -50%) rotate(' + (winding += 90) +'deg)';
		return;
	}

	setOpen = !setOpen;
	toggleSet(setOpen);
});

//open log, sector, and storage menus
logCreateButton.addEventListener('click', function() {
	toggleMenu('log');
});

sectorCreateButton.addEventListener('click', function() {
	toggleMenu('sector');
});

storageCreateButton.addEventListener('click', function() {
	toggleMenu('storage');
});

//select log type
logCreateAcquisition.addEventListener('click', function() {
	switchLogCreateSelection('Acquisition');
});

logCreateSpending.addEventListener('click', function() {
	switchLogCreateSelection('Spending');
});

logCreateMovement.addEventListener('click', function() {
	switchLogCreateSelection('Movement');
});