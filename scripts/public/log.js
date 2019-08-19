function Log(amount, logCurrency, type, source, destination, fee, date, time, sector, id = null) {
	this.amount = parseFloat(amount);
	this.currency = logCurrency;
	this.type = type; //acquisition, spending, movement
	this.source = source;
	this.destination = destination;
	this.fee = fee;

	this.date = date;
	var dt = new Date(this.date);
	var y = dt.getYear() + 1900;
	var m = forceDigitsOnInteger(dt.getMonth() + 1, 2);
	var d = forceDigitsOnInteger(dt.getDate(), 2);
	this.processedDate = y + '.' + m + '.' + d;

	if (time) {
		var h = forceDigitsOnInteger(time.split(':')[0], 2);
		var min = forceDigitsOnInteger(time.split(':')[1], 2);
		this.time = h + ':' + min;
	}

	this.sector = sector;

	//if log is created by user, it's always created after all other logs have loaded,
	//ensuring that generated id will be +1 above all existing logs
	this.id = id;
	if (id == null) this.id = logs.length;

	this.element;
	this.elementLog;

	this.deleteToggled = false;

	this.createElement = function(self) {
		var container = document.createElement('DIV');
		container.className = 'logContainer';

		var log = document.createElement('A');
		log.href = '#';
		log.className = 'log';
		log.addEventListener('click', function() {
			self.toggleDelete(self);
		});

		//amount, currency, type
		var amount = document.createElement('SPAN');
		amount.className = 'logAmount';
		var mod;

		switch (this.type) {
			case 'Acquisition':
				mod = '+';
				break;

			case 'Spending':
				mod = '-';
				break;

			case 'Movement':
				mod = '~';
				break;
		}

		//always display amount with 0 decimals, unless exceeding thousands,
		//then add "k" for thousand and single decimal
		var a = parseFloat(this.amount);
		if (a.toFixed().length < 2) {
			amount.innerText = mod + a.toFixed(2) + this.currency;
		} else if (a.toString().length <= 5) {
			amount.innerText = mod + a.toFixed() + this.currency;
		} else {
			var treatedAmount = this.amount / 1000;
			treatedAmount = treatedAmount.toFixed(1) + 'k';
			amount.innerText = mod + treatedAmount + this.currency;
		}
		
		log.appendChild(amount);

		//fee
		if (this.fee != 0) {
			var feeElement = document.createElement('SPAN');
			feeElement.className = 'logFee';
			feeElement.innerText = '-' + this.fee + this.currency;
			log.appendChild(feeElement);
		}

		//source, destination + icon
		var transaction = document.createElement('SPAN');
		transaction.className = 'logTransaction';
		var transactionNode;

		//if destination or source is storage, display its icon
		var transactionIconGiver = '<i class="logGiverIcon material-icons"';
		var transactionIconReciever = '<i class="logRecieverIcon material-icons"';
		var isMovement = false;

		switch (this.type) {
			case 'Acquisition':
				if (findStorage(this.destination)) {
					var s = findStorage(this.destination);
					transactionIconReciever += 'style="color:' + s.color +'">';
					transactionIconReciever += s.icon + '</i>';
					transactionNode = this.source + ' > ' + transactionIconReciever + ' ' + this.destination;
				} else {
					transactionNode = this.source + ' > ' + this.destination;
				}
				break;

			case 'Spending':
				if (findStorage(this.source)) {
					var s = findStorage(this.source);
					transactionIconGiver += 'style="color:' + s.color +'">';
					transactionIconGiver += s.icon + '</i>';
					transactionNode = transactionIconGiver + ' ' + this.source + ' > ' + this.destination;
				} else {
					transactionNode = this.source + ' > ' + this.destination;
				}
				break;

			case 'Movement':
				isMovement = true;
				if (findStorage(this.destination)) {
					var s = findStorage(this.destination);
					transactionIconReciever += 'style="color:' + s.color +'">';
					transactionIconReciever += s.icon + '</i>';
				} else {
					transactionIconGiver = '';
				}

				if (findStorage(this.source)) {
					var s = findStorage(this.source);
					transactionIconGiver += 'style="color:' + s.color +'">';
					transactionIconGiver += s.icon + '</i>';
				} else {
					transactionIconGiver = '';
				}
				break;

			default:
				transactionNode = this.source + ' > ' + this.destination;
				break;
		}

		if (isMovement) transactionNode = transactionIconGiver + ' ' + this.source + ' > ' + transactionIconReciever + ' ' + this.destination;

		transaction.innerHTML = transactionNode;
		log.appendChild(transaction);

		//date & time
		var time = document.createElement('SPAN');
		time.className = 'logTime';
		if (this.time != '00:00') time.innerText = this.processedDate + ' - ' + this.time;
		else time.innerText = this.processedDate;
		log.appendChild(time);

		//sector icon
		if (findSector(this.sector)) {
			var s = findSector(this.sector);
			var sectorIcon = document.createElement('I');
			sectorIcon.className = 'logSectorIcon material-icons';
			sectorIcon.innerText = s.icon;
			sectorIcon.style.color = s.color;
		} else {
			var sectorIcon = document.createElement('I');
			sectorIcon.className = 'logSectorIcon material-icons';
			sectorIcon.innerText = 'trip_origin';
			sectorIcon.style.color = '#ccc';
		}

		log.appendChild(sectorIcon);

		//delete toggle - append to container to avoid shared transform between toggle and log
		var deleteContainer = document.createElement('A');
		deleteContainer.href = '#';
		deleteContainer.addEventListener('click', function() {
			deleteLog(self);
		});
		deleteContainer.className = 'logDeleteButton';
		deleteContainer.innerHTML = '<i class="logDeleteIcon material-icons">remove_circle</i>';
		container.appendChild(deleteContainer);

		container.append(log);

		this.elementLog = log;
		this.element = container;
	}

	this.createElement(this);

	this.toggleDelete = function(self) {
		//close toggle if open
		if (self.deleteToggled) {
			self.deleteToggled = false;
			self.elementLog.style.transform = 'translateX(0)';
			return;
		}

		//close all log delete toggles
		closeAllLogDeletes();

		self.deleteToggled = true;

		//toggle delete
		self.elementLog.style.transform = 'translateX(-80px)';
	}

	this.createJSON = function() {
		var obj = new Object();

		obj.amount = Number(this.amount);
		obj.currency = this.currency;
		obj.type = this.type;
		obj.source = this.source;
		obj.destination = this.destination;
		obj.fee = Number(this.fee);
		obj.date = this.date;
		obj.time = this.time;
		obj.sector = this.sector;
		obj.id = Number(this.id);

		return JSON.stringify(obj);
	}
}

function findLog(id) {
	for (var i = 0; i < logs.length; i++) {
		if (logs[i].id == id) return logs[i];
	}
	return false;
}

function closeAllLogDeletes() {
	for (var i = 0; i < logs.length; i++) {
		if (logs[i].deleteToggled) {
			logs[i].toggleDelete(logs[i]);
		}
	}
}

function createLog() {
	if (awaitingInputLog) {
		//verify data type
		if (isNaN(logCreateAmount.value)) {
			logCreateFeedback.innerText = '"Amount" is not a number.';
			return;
		}

		if (!isNaN(logCreateCurrency.value) ||
			(logCreateCurrency.value != '$') &&
			logCreateCurrency.value != '¥' &&
			logCreateCurrency.value != '€' &&
			logCreateCurrency.value != '円' &&
			logCreateCurrency.valu != '£') {
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

		//optional time
		var timePresent = false;

		if (logCreateHour.value || logCreateMinute.value) {
			timePresent = true;

			if (isNaN(logCreateHour.value)) {
				logCreateFeedback.innerText = '"Hour" is not a number.';
				return;
			}

			if (isNaN(logCreateMinute.value)) {
				logCreateFeedback.innerText = '"Minute" is not a number.';
				return;
			}

			if (logCreateHour.value > 23) {
				logCreateFeedback.innerText = '"Hour" is not a valid number.';
				return;
			}

			if (logCreateMinute.value > 60) {
				logCreateFeedback.innerText = '"Minute" is not a valid number.';
				return;
			}

			//format for missing hour or minutes
			if (logCreateHour.value == '') logCreateHour.value = '00';
			if (logCreateMinute.value == '') logCreateMinute.value = '00';
		}

		//verify data presence
		if (logCreateAmount.value == '') {
			logCreateFeedback.innerText = 'Missing "amount".';
			return;
		}

		if (logCreateCurrency.value == '') {
			logCreateFeedback.innerText = 'Missing "currency".';
			return;
		}

		if (logCreateYear.value == '') {
			logCreateFeedback.innerText = 'Missing "year".';
			return;
		}

		if (logCreateMonth.value == '') {
			logCreateFeedback.innerText = 'Missing "month".';
			return;
		}

		if (logCreateDay.value == '') {
			logCreateFeedback.innerText = 'Missing "day".';
			return;
		}

		//create log
		var date = logCreateYear.value + '-' + logCreateMonth.value + '-' + logCreateDay.value;
		var time = '00:00';
		if (timePresent) time = logCreateHour.value + ':' + logCreateMinute.value;
		var tempLog;

		switch (logFormSelectionType) {
			case 'Acquisition':
				if (logCreateSource.value == '') {
					logCreateFeedback.innerText = 'Missing "source".';
					return;
				}
				awaitingInputLog = false;
				tempLog = new Log(logCreateAmount.value, logCreateCurrency.value, logFormSelectionType, logCreateSource.value, logCreateStorageDestination.value, 0, date, time, logCreateSector.value);
				request('newLog', null, tempLog.createJSON());
				break;

			case 'Spending':
				if (logCreateDestination.value == '') {
					logCreateFeedback.innerText = 'Missing "destinaion".';
					return;
				}
				awaitingInputLog = false;
				tempLog = new Log(logCreateAmount.value, logCreateCurrency.value, logFormSelectionType, logCreateStorageSource.value, logCreateDestination.value, 0, date, time, logCreateSector.value);
				request('newLog', null, tempLog.createJSON());
				break;

			case 'Movement':
				awaitingInputLog = false;
				tempLog = new Log(logCreateAmount.value, logCreateCurrency.value, logFormSelectionType, logCreateStorageSource.value, logCreateStorageDestination.value, logCreateFee.value, date, time, logCreateSector.value);
				request('newLog', null, tempLog.createJSON());
				break;
		}

		logs.push(tempLog);
		refreshLogList();
		refreshLogForm();
		refreshTracking();
		updateStats();
		toggleMenu('log');
	}
}

function deleteLog(log) {
	closeAllLogDeletes();

	request('deleteLog', function() {
		for (var i = 0; i < logs.length; i++) {
			if (logs[i].id == log.id) {
				logs.splice(i, 1);
				refreshLogList();
				refreshTracking();
				updateStats();
				return;
			}
		}
	}, null, log.id);
}

function refreshLogForm() {
	logCreateAmount.value = null;
	logCreateCurrency.value = null;

	logCreateYear.value = null;
	logCreateMonth.value = null;
	logCreateDay.value = null;
	logCreateHour.value = null;
	logCreateMinute.value = null;

	logCreateSource.value = null;
	logCreateFee.value = null;
	logCreateDestination.value = null;

	logCreateFeedback.innerText = '';

	setTimeout(function() {
		awaitingInputLog = true;
	}, 1000);
}