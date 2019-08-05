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
	removeLogin();

	//populate screens with content
	populateContent();
}

function removeLogin() {
	loginWindow.style.opacity = 0;

	setTimeout(function() {
		loginWindow.style.display = 'none';
		loginHider.style.transform = 'translateY(100%)';
	}, 1000);

	setTimeout(function() {
		loginHider.style.display = 'none';
	}, 2000);
}

//populate logs, sectors, and storages
function populateContent() {
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
			storages.push(new Storage(jsonStorages[i].name, jsonStorages[i].amount, jsonStorages[i].icon, jsonStorages[i].color));
			refreshStorageList();
		}

		for (var i = 0; i < jsonLogs.length; i++) {
			logs.push(new Log(jsonLogs[i].amount, jsonLogs[i].currency, jsonLogs[i].type, jsonLogs[i].source, jsonLogs[i].destination, jsonLogs[i].fee, jsonLogs[i].date, jsonLogs[i].sector));
			refreshLogList();
		}

		//create options in dropdown lists
		createOptions();

		//create colors and icons in pickers
		createColors();
		createIcons();

		//set currency placeholder in settings
		currencySetting.placeholder = currency;

		//update monthly stats
		updateMonthlyStats();
	});
}

function createOptions() {
	//storages
	for (var i = 0; i < storages.length; i++) {
		var option = document.createElement('OPTION');
		option.value = storages[i].name;
		option.className = 'selectorOption';
		option.innerText = storages[i].name;

		var optionClone = option.cloneNode(true);

		logCreateStorageSource.appendChild(option);
		logCreateStorageDestination.appendChild(optionClone);
	}

	//sectors
	for (var i = 0; i < sectors.length; i++) {
		var option = document.createElement('OPTION');
		option.value = sectors[i].name;
		option.className = 'selectorOption';
		option.innerText = sectors[i].name;

		logCreateSector.appendChild(option);
	}
}

//todo: limit to month
function updateMonthlyStats() {
	var total = 0;

	for (var i = 0; i < storages.length; i++) {
		total += storages[i].amount;
	}

	footTotal.innerText = total + currency;

	var totalAcquisition = 0;
	var totalSpending = 0;

	for (var i = 0; i < logs.length; i++) {
		switch (logs[i].type) {
			case 'Acquisition':
				totalAcquisition += logs[i].amount;
				break;

			case 'Spending':
				totalSpending += logs[i].amount;
				break;

			case 'Movement':
				totalSpending += logs[i].fee;
				break;
		}
	}

	footTotal.innerText = total + currency + '   ' + '+' + totalAcquisition + currency + '   ' + '-' + totalSpending + currency;
}

function refreshLogList() {
	//sort logs by date
	logs.sort(function(a, b) { 
		return new Date(b.date) - new Date(a.date);
	});

	//clear all logs
	while (logScreen.children.length > 2) {
		logScreen.removeChild(logScreen.children[logScreen.children.length - 1]);  
	}

	//append sorted logs
	for (var i = 0; i < logs.length; i++) {
		logScreen.appendChild(logs[i].element);
	}
}

function refreshSectorList() {
	//sort sectors alphabetically
	sectors.sort(function(a, b) {
		var textA = a.name.toLowerCase();
		var textB = b.name.toLowerCase();
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});

	//clear all sectors
	while (sectorList.children.length > 0) {
		sectorList.removeChild(sectorList.children[sectorList.children.length - 1]);  
	}

	//append sorted sectors
	for (var i = 0; i < sectors.length; i++) {
		sectorList.appendChild(sectors[i].element);
	}
}

function refreshStorageList() {
	//sort storages alphabetically
	storages.sort(function(a, b) {
		var textA = a.name.toLowerCase();
		var textB = b.name.toLowerCase();
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});

	//clear all storages
	while (storageList.children.length > 0) {
		storageList.removeChild(storageList.children[storageList.children.length - 1]);  
	}

	//append sorted storages
	for (var i = 0; i < storages.length; i++) {
		storageList.appendChild(storages[i].element);
	}
}

function refreshLogForm() {
	logCreateAmount.value = null;
	logCreateCurrency.value = null;

	logCreateYear.value = null;
	logCreateMonth.value = null;
	logCreateDay.value = null;

	logCreateSource.value = null;
	logCreateFee.value = null;
	logCreateDestination.value = null;
}

function createColors() {
	for (var i = 0; i < colorList.length; i++) {
		var col = document.createElement('A');
		col.href = '#';
		col.className = 'colorChoice';
		col.style.backgroundColor = '#' + colorList[i];
		col.addEventListener('click', function() {
			pickColor(this);
		});
		colorPicker.appendChild(col);
	}
}

function createIcons() {
	for (var i = 0; i < iconList.length; i++) {
		var ico = document.createElement('I');
		ico.href = '#';
		ico.className = 'iconChoice material-icons';
		ico.innerText = iconList[i];
		ico.addEventListener('click', function() {
			pickIcon(this);
		});
		iconPicker.appendChild(ico);
	}
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

// CONTROL

function switchScreen(screen) {
	isTracking = screen;
	if (isTracking) {
		barSelector.style.transform = 'translateX(0)';
		trkButtonText.style.color = '#fafafa';
		logButtonText.style.color = '#ccc';

		//move screen
		logScreen.style.transform = 'translateX(100%)';
		trkScreen.style.transform = 'translateX(0)';

	} else {
		barSelector.style.transform = 'translateX(100%)';
		trkButtonText.style.color = '#ccc';
		logButtonText.style.color = '#fafafa';

		//move screen
		trkScreen.style.transform = 'translateX(-100%)';
		logScreen.style.transform = 'translateX(0)';
	}
}

function toggleSet(activate) {
	if (activate) {
		setScreen.style.transform = 'translateY(-1px)';
		setButton.style.backgroundColor = '#ccc';
		setButtonText.style.transform = 'translate(-50%, -50%) rotate(45deg)';
		setButtonText.style.color = '#fafafa';
	} else {
		setScreen.style.transform = 'translateY(100%)';
		setButton.style.backgroundColor = '#fafafa';
		setButtonText.style.transform = 'translate(-50%, -50%) rotate(0deg)';
		setButtonText.style.color = '#ccc';
	}
}

function toggleMenu(activate) {
	logMenu.style.maxHeight = '0';
	logMenu.style.padding = '0';
	sectorMenu.style.maxHeight = '0';
	sectorMenu.style.padding = '0';
	storageMenu.style.maxHeight = '0';
	storageMenu.style.padding = '0';

	switch (activate) {
		case 'log':
			if (openMenu == activate) {
				logMenu.style.maxHeight = '0';
				logMenu.style.padding = '0';
				openMenu = '';
			} else {
				logMenu.style.maxHeight = '500px';
				logMenu.style.padding = '20px 0 20px 0';
				openMenu = 'log';
			}
			break;

		case 'sector':
			if (openMenu == activate) {
				sectorMenu.style.maxHeight = '0';
				sectorMenu.style.padding = '0';
				openMenu = '';
			} else {
				sectorMenu.style.maxHeight = '250px';
				sectorMenu.style.padding = '20px 0 20px 0';
				openMenu = 'sector';
			}
			break;

		case 'storage':
			if (openMenu == activate) {
				storageMenu.style.maxHeight = '0';
				storageMenu.style.padding = '0';
				openMenu = '';
			} else {
				storageMenu.style.maxHeight = '250px';
				storageMenu.style.padding = '20px 0 20px 0';
				openMenu = 'storage';
			}
			break;
	}
}

function switchLogCreateSelection(activate) {
	logFormSelectionType = activate;

	logCreateStorageSource.style.display = 'none';
	logCreateStorageDestination.style.display = 'none';
	logCreateSource.style.display = 'none';
	logCreateDestination.style.display = 'none';
	logCreateFee.style.display = 'none';

	logCreateAcquisitionText.style.color = '#ccc';
	logCreateSpendingText.style.color = '#ccc';
	logCreateMovementText.style.color = '#ccc';

	switch (activate) {
		case 'Acquisition':
			logCreateSource.style.display = 'inline-block';
			logCreateStorageDestination.style.display = 'inline-block';

			logCreateAcquisitionText.style.color = '#fafafa';
			logCreateSelector.style.transform = 'translateX(0)';
			break;

		case 'Spending':
			logCreateStorageSource.style.display = 'inline-block';
			logCreateDestination.style.display = 'inline-block';

			logCreateSpendingText.style.color = '#fafafa';
			logCreateSelector.style.transform = 'translateX(100%)';
			break;

		case 'Movement':
			logCreateStorageSource.style.display = 'inline-block';
			logCreateStorageDestination.style.display = 'inline-block';
			logCreateFee.style.display = 'inline-block';

			logCreateMovementText.style.color = '#fafafa';
			logCreateSelector.style.transform = 'translateX(calc(100% * 2))';
			break;
	}
}

function changeCurrency() {
	if (currencySetting.value != '' || currencySetting != null) {
		switch (currencySetting.value) {
			case '$':
				currency = '$';
				currencySetting.placeholder = currency;
				updateMonthlyStats();
				break;

			case '¥':
				currency = '¥';
				currencySetting.placeholder = currency;
				updateMonthlyStats();
				break;

			case '€':
				currency = '€';
				currencySetting.placeholder = currency;
				updateMonthlyStats();
				break;
		}
	}
}

function openColorPicker() {
	colorPicker.style.transform = 'translateX(-1px)';
}

function closeColorPicker() {
	colorPicker.style.transform = 'translateX(calc(100% + 1px))';
}

function pickColor(swatch) {
	switch (openMenu) {
		case 'sector':
			sectorCreateColor.style.backgroundColor = swatch.style.backgroundColor;
			break;

		case 'storage':
			storageCreateColor.style.backgroundColor = swatch.style.backgroundColor;
			break;
	}
	closeColorPicker();
}

function openIconPicker() {
	iconPicker.style.transform = 'translateX(-1px)';
}

function closeIconPicker() {
	iconPicker.style.transform = 'translateX(calc(100% + 1px))';
}

function pickIcon(ico) {
	switch (openMenu) {
		case 'sector':
			sectorCreateIconIcon.innerText = ico.innerText;
			break;

		case 'storage':
			storageCreateIconIcon.innerText = ico.innerText;
			break;
	}
	closeIconPicker();
}

// CREATION AND DELETION

function createLog() {
	//verify data type
	if (isNaN(logCreateAmount.value)) {
		logCreateFeedback.innerText = '"Amount" is not a number.';
		return;
	}

	if (!isNaN(logCreateCurrency.value)) {
		logCreateFeedback.innerText = '"Currency" is not a valid value.';
		return;
	}

	if (isNaN(logCreateYear.value) || isNaN(logCreateMonth.value) || isNaN(logCreateDay.value)) {
		logCreateFeedback.innerText = '"Date" is not a number.';
		return;
	}

	if (logCreateYear.value.toString().indexOf('.') != -1 ||
		logCreateMonth.value.toString().indexOf('.') != -1 ||
		logCreateDay.value.toString().indexOf('.') != -1 ||
		logCreateYear.value.toString().indexOf(',') != -1 ||
		logCreateMonth.value.toString().indexOf(',') != -1 ||
		logCreateDay.value.toString().indexOf(',') != -1 ||
		logCreateYear.value.toString().indexOf('-') != -1 ||
		logCreateMonth.value.toString().indexOf('-') != -1 ||
		logCreateDay.value.toString().indexOf('-') != -1) {
		logCreateFeedback.innerText = '"Date" is not a valid number.';
		return;
	}

	if (logCreateMonth.value > 12) {
		logCreateFeedback.innerText = '"Month" is not a valid number.';
		return;
	}

	if (logCreateDay.value > 31) {
		logCreateFeedback.innerText = '"Day" is not a valid number.';
		return;
	}

	//verify data presence
	var dataConfirm = false;

	if (logCreateAmount.value != '' ||
		logCreateCurrency.value != '' ||
		logCreateYear.value != '' ||
		logCreateMonth.value != '' ||
		logCreateDay.value != '') {

		var date = logCreateYear.value + '.' + logCreateMonth.value + '.' + logCreateDay.value;

		switch (logFormSelectionType) {
			case 'Acquisition':
				if (logCreateSource.value != '') {
					dataConfirm = true;
					logs.push(new Log(logCreateAmount.value, logCreateCurrency.value, logFormSelectionType, logCreateSource.value, logCreateStorageDestination.value, 0, date, logCreateSector.value));
					refreshLogList();
				}
				break;

			case 'Spending':
				if (logCreateDestination.value != '') {
					dataConfirm = true;
					logs.push(new Log(logCreateAmount.value, logCreateCurrency.value, logFormSelectionType, logCreateStorageSource.value, logCreateDestination.value, 0, date, logCreateSector.value));
					refreshLogList();
				}
				break;

			case 'Movement':
				dataConfirm = true;
				logs.push(new Log(logCreateAmount.value, logCreateCurrency.value, logFormSelectionType, logCreateStorageSource.value, logCreateStorageDestination.value, logCreateFee.value, date, logCreateSector.value));
				refreshLogList();
				break;
		}
	}

	if (!dataConfirm) {
		logCreateFeedback.innerText = 'Missing information.';
		return;
	} else {
		refreshLogForm();
		toggleMenu('log');
	}
}

function deleteLog() {

}

function createSector() {

}

function deleteSector() {

}

function createStorage() {

}

function deleteStorage() {

}