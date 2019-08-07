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

//todo: save as cookie, make stats reflect currency conversion
function changeCurrency() {
	if (currencySetting.value != '' || currencySetting != null) {
		switch (currencySetting.value) {
			case '$':
				currency = '$';
				currencySetting.placeholder = currency;
				updateStats();
				break;

			case '¥':
				currency = '¥';
				currencySetting.placeholder = currency;
				updateStats();
				break;

			case '€':
				currency = '€';
				currencySetting.placeholder = currency;
				updateStats();
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

// CREATION & DELETION

function createLog() {
	//verify data type
	if (isNaN(logCreateAmount.value)) {
		logCreateFeedback.innerText = '"Amount" is not a number.';
		return;
	}

	if (!isNaN(logCreateCurrency.value) ||
		(logCreateCurrency.value != '$') &&
		logCreateCurrency.value != '¥' &&
		logCreateCurrency.value != '€') {
		logCreateFeedback.innerText = '"Currency" is not a valid value.';
		return;
	}

	if (isNaN(logCreateYear.value) || isNaN(logCreateMonth.value) || isNaN(logCreateDay.value)) {
		logCreateFeedback.innerText = '"Date" is not a number.';
		return;
	}

	if (logCreateYear.value.toString().length < 4) {
		logCreateFeedback.innerText = '"Year" is not a valid value.';
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

	if (logCreateAmount.value != '' &&
		logCreateCurrency.value != '' &&
		logCreateYear.value != '' &&
		logCreateMonth.value != '' &&
		logCreateDay.value != '') {

		var date = logCreateYear.value + '.' + logCreateMonth.value + '.' + logCreateDay.value;
		var tempLog;

		switch (logFormSelectionType) {
			case 'Acquisition':
				if (logCreateSource.value != '') {
					dataConfirm = true;
					tempLog = new Log(logCreateAmount.value, logCreateCurrency.value, logFormSelectionType, logCreateSource.value, logCreateStorageDestination.value, 0, date, logCreateSector.value);
					request('newLog', null, tempLog.createJSON());
				}
				break;

			case 'Spending':
				if (logCreateDestination.value != '') {
					dataConfirm = true;
					tempLog = new Log(logCreateAmount.value, logCreateCurrency.value, logFormSelectionType, logCreateStorageSource.value, logCreateDestination.value, 0, date, logCreateSector.value);
					request('newLog', null, tempLog.createJSON());
				}
				break;

			case 'Movement':
				dataConfirm = true;
				tempLog = new Log(logCreateAmount.value, logCreateCurrency.value, logFormSelectionType, logCreateStorageSource.value, logCreateStorageDestination.value, logCreateFee.value, date, logCreateSector.value);
				request('newLog', null, tempLog.createJSON());
				break;
		}
	}

	if (!dataConfirm) {
		logCreateFeedback.innerText = 'Missing information.';
		return;
	} else {
		logs.push(tempLog);
		refreshLogList();
		refreshLogForm();
		updateStats();
		toggleMenu('log');
	}
}

function deleteLog() {

}

function createSector() {
	if (sectorCreateName.value != '') {
		var tempSector = new Sector(sectorCreateName.value, sectorCreateIconIcon.innerText, sectorCreateColor.style.backgroundColor);
		sectors.push(tempSector);
		request('newSector', null, tempSector.createJSON());
		refreshSectorList();
		refreshSectorForm();
		refreshOptions();
		toggleMenu('sector');
	} else {
		sectorCreateFeedback.innerText = 'Missing information.';
		return;
	}
}

function deleteSector() {

}

function createStorage() {
	if (storageCreateName.value != '') {
		var tempStorage = new Storage(storageCreateName.value, storageCreateIconIcon.innerText, storageCreateColor.style.backgroundColor);
		storages.push(tempStorage);
		request('newStorage', null, tempStorage.createJSON());
		refreshStorageList();
		refreshStorageForm();
		refreshOptions();
		toggleMenu('storage');
	} else {
		storageCreateFeedback.innerText = 'Missing information.';
		return;
	}
}

function deleteStorage() {

}

function refreshOptions() {
	//reset
	logCreateStorageSource.innerText = null;
	logCreateStorageDestination.innerText = null;
	logCreateSector.innerText = null;

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

//todo: limit to month, take into account currency
function updateStats() {
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

	footData.innerText = '+' + parseFloat(totalAcquisition).toFixed(2) + currency + '   ' + '-' + parseFloat(totalSpending).toFixed(2) + currency;
}

//todo: add month tags
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

function fillLogForm(log) {
	selectedLog = log;

	logCreateAmount.value = log.amount;
	logCreateCurrency.value = log.currency;

	var date = new Date(log.date);

	logCreateYear.value = date.getYear() + 1900;
	logCreateMonth.value = forceDigitsOnInteger(date.getMonth() + 1, 2);
	logCreateDay.value = forceDigitsOnInteger(date.getDate(), 2);

	logCreateSource.value = log.source;
	logCreateFee.value = log.fee;
	logCreateDestination.value = log.destination;

	if (openMenu != 'log') {
		toggleMenu('log');
	}
}

function fillSectorForm(sector) {
	selectedSector = sector;

	sectorCreateName.value = sector.name;
	sectorCreateColor.style.backgroundColor = sector.color;
	sectorCreateIconIcon.innerText = sector.icon;

	if (openMenu != 'sector') {
		toggleMenu('sector');
	}
}

function fillStorageForm(storage) {
	storageCreateName.value = storage.name;
	storageCreateColor.style.backgroundColor = storage.color;
	storageCreateIconIcon.innerText = storage.icon;

	if (openMenu != 'storage') {
		toggleMenu('storage');
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

function refreshSectorForm() {
	sectorCreateName.value = null;
	sectorCreateColor.style.backgroundColor = '#ccc';
	sectorCreateIconIcon.innerText = 'trip_origin';
}

function refreshStorageForm() {
	storageCreateName.value = null;
	storageCreateColor.style.backgroundColor = '#ccc';
	storageCreateIconIcon.innerText = 'trip_origin';
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