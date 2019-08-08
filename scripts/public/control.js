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

		//close all log deletes to keep interface clean
		closeAllLogDeletes();
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
		setButtonText.style.transform = 'translate(-50%, -50%) rotate(' + (winding = 45) +'deg)';
		setButtonText.style.color = '#fafafa';
	} else {
		setScreen.style.transform = 'translateY(100%)';
		setButton.style.backgroundColor = '#fafafa';
		setButtonText.style.transform = 'translate(-50%, -50%) rotate(' + (winding = 0) +'deg)';
		setButtonText.style.color = '#ccc';

		//close all deletes for cleanliness
		closeAllSectorDeletes();
		closeAllStorageDeletes();
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

				//autofill data with date and currency
				logCreateCurrency.value = currency;
				var date = new Date();
				logCreateYear.value = date.getYear() + 1900;
				logCreateMonth.value = forceDigitsOnInteger(date.getMonth() + 1, 2);
				logCreateDay.value = forceDigitsOnInteger(date.getDate(), 2);

				//close delete toggles for cleanliness
				closeAllLogDeletes();
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

				//close for cleanliness
				closeAllSectorDeletes();
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

				//close for cleanliness
				closeAllStorageDeletes();
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
				setCookie('currency', currency, 2);
				updateStats();
				break;

			case '¥':
				currency = '¥';
				currencySetting.placeholder = currency;
				setCookie('currency', currency, 2);
				updateStats();
				break;

			case '円':
				currency = '円';
				currencySetting.placeholder = currency;
				setCookie('currency', currency, 2);
				updateStats();
				break;

			case '€':
				currency = '€';
				currencySetting.placeholder = currency;
				setCookie('currency', currency, 2);
				updateStats();
				break;

			case '£':
				currency = '£';
				currencySetting.placeholder = currency;
				setCookie('currency', currency, 2);
				updateStats();
				break;		
		}
	}
}

//uses US$ as base for exchange rates
function calculateExchangeRate(given, amount, desired) {
	if (given == desired) return amount;

	return amount;
}

function openColorPicker() {
	colorOpen = true;
	colorPicker.style.transform = 'translateX(-1px)';
}

function closeColorPicker() {
	colorOpen = false;
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
	iconOpen = true;
	iconPicker.style.transform = 'translateX(-1px)';
}

function closeIconPicker() {
	iconOpen = false;
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

function updateStats() {
	var totalAcquisition = 0;
	var totalSpending = 0;

	for (var i = 0; i < logs.length; i++) {
		switch (logs[i].type) {
			case 'Acquisition':
				totalAcquisition += calculateExchangeRate(logs[i].currency, parseFloat(logs[i].amount), currency);
				break;

			case 'Spending':
				totalSpending += calculateExchangeRate(logs[i].currency, parseFloat(logs[i].amount), currency);
				break;

			case 'Movement':
				totalSpending += calculateExchangeRate(logs[i].currency, parseFloat(logs[i].fee), currency);
				break;
		}
	}

	footData.innerText = '+' + parseFloat(totalAcquisition).toFixed(2) + currency + '   ' + '-' + parseFloat(totalSpending).toFixed(2) + currency;
}

// CREATION

function refreshLogList() {
	//clear all logs
	while (logScreen.children.length > 2) {
		logScreen.removeChild(logScreen.children[logScreen.children.length - 1]);  
	}

	//return if no logs to display
	if (logs.length < 1) return;

	//sort logs by time
	logs.sort(function(a, b) {
		var bt = new Date(b.date);
		var by = bt.getYear() + 1900;
		var bm = forceDigitsOnInteger(bt.getMonth() + 1, 2);
		var bd = forceDigitsOnInteger(bt.getDate(), 2);

		var at = new Date(a.date);
		var ay = at.getYear() + 1900;
		var am = forceDigitsOnInteger(at.getMonth() + 1, 2);
		var ad = forceDigitsOnInteger(at.getDate(), 2);

		return new Date(by + '-' + bm + '-' + bd + 'T' + b.time) - new Date(ay + '-' + am + '-' + ad + 'T' + a.time);
	});

	//append sorted logs along with month tags
	var month = new Date(logs[0].date).getMonth();

	for (var i = 0; i < logs.length; i++) {

		if (new Date(logs[i].date).getMonth() != month) {
			month = new Date(logs[i].date).getMonth();

			var dateTag = document.createElement('DIV');
			dateTag.className = 'dateTag';
			dateTag.innerHTML = '<span class="dateTagText">' + new Date(logs[i].date).toLocaleString('default', { month: 'long' }) + ', ' + (new Date(logs[i].date).getYear() + 1900) + '</span>';

			logScreen.appendChild(dateTag);
		}
		
		logScreen.appendChild(logs[i].element);
	}
}

function refreshSectorList() {
	//clear all sectors
	while (sectorList.children.length > 0) {
		sectorList.removeChild(sectorList.children[sectorList.children.length - 1]);  
	}

	//return if no sectors to display
	if (sectors.length < 1) return;

	//sort sectors alphabetically
	sectors.sort(function(a, b) {
		var textA = a.name.toLowerCase();
		var textB = b.name.toLowerCase();
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});

	//append sorted sectors
	for (var i = 0; i < sectors.length; i++) {
		sectorList.appendChild(sectors[i].element);
	}
}

function refreshStorageList() {
	//clear all storages
	while (storageList.children.length > 0) {
		storageList.removeChild(storageList.children[storageList.children.length - 1]); 
	} 
	
	//return if no storages to display
	if (storages.length < 1) return;

	//sort storages alphabetically
	storages.sort(function(a, b) {
		var textA = a.name.toLowerCase();
		var textB = b.name.toLowerCase();
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});

	//append sorted storages
	for (var i = 0; i < storages.length; i++) {
		storageList.appendChild(storages[i].element);
	}
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