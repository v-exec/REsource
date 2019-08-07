function Log(amount, logCurrency, type, source, destination, fee, date, time, sector, id = null) {
	this.amount = parseFloat(amount);
	this.currency = logCurrency;
	this.type = type; //acquisition, spending, movement
	this.source = source;
	this.destination = destination;
	this.fee = fee;

	var dt = new Date(date);
	var y = dt.getYear() + 1900;
	var m = forceDigitsOnInteger(dt.getMonth() + 1, 2);
	var d = forceDigitsOnInteger(dt.getDate(), 2);
	this.date = y + '.' + m + '.' + d;

	var h = forceDigitsOnInteger(time.split(':')[0], 2);
	var min = forceDigitsOnInteger(time.split(':')[1], 2);
	this.time = h + ':' + min;

	this.sector = sector;

	//if log is created by user, it's always created after all other logs have loaded,
	//ensuring that generated id will be +1 above all existing logs
	this.id;
	if (id = null) this.id = logs.length;

	this.element;

	this.createElement = function(self) {
		var container = document.createElement('A');
		container.href = '#';
		container.className = 'log';
		container.addEventListener('click', function() {
			self.toggleDelete();
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
		
		container.appendChild(amount);

		//fee
		if (this.fee != 0) {
			var feeElement = document.createElement('SPAN');
			feeElement.className = 'logFee';
			feeElement.innerText = '-' + this.fee + this.currency;
			container.appendChild(feeElement);
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
		container.appendChild(transaction);

		//date
		var date = document.createElement('SPAN');
		date.className = 'logDate';
		date.innerText = this.date
		container.appendChild(date);

		var time = document.createElement('SPAN');
		time.className = 'logTime';
		time.innerText = this.time;
		container.appendChild(time);

		//sector icon
		if (findSector(this.sector)) {
			var s = findSector(this.sector);
			var sectorIcon = document.createElement('i');
			sectorIcon.className = 'logSectorIcon material-icons';
			sectorIcon.innerText = s.icon;
			sectorIcon.style.color = s.color;
		} else {
			var sectorIcon = document.createElement('i');
			sectorIcon.className = 'logSectorIcon material-icons';
			sectorIcon.innerText = 'trip_origin';
			sectorIcon.style.color = '#ccc';
		}

		container.appendChild(sectorIcon);

		this.element = container;
	}

	this.createElement(this);

	this.toggleDelete = function() {

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