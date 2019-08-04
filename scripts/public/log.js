function Log(amount, currency, type, source, destination, fee, date, sector, id = null) {
	this.amount = amount;
	this.currency = currency;
	this.type = type; //acquisition, spending, movement
	this.source = source;
	this.destination = destination;
	this.fee = fee;
	this.date = date;
	this.sector = sector;
	this.id;
	this.element;

	//move money to appropriate storage todo: take into account currency conversions, make functional
	// switch (this.type) {
	// 	case 'Acquisition':
	// 		if (findStorage(this.source)) findStorage(this.source).amount += this.amount;
	// 		break;

	// 	case 'Spending':
	// 		if (findStorage(this.destination)) findStorage(this.destination).amount -= this.amount;
	// 		break;

	// 	case 'Movement':
	// 		if (findStorage(this.destination) && findStorage(this.source)) {
	// 			findStorage(this.source).amount -= this.amount;
	// 			findStorage(this.destination).amount += (this.amount - this.fee);
	// 		}
	// 		break;
	// }

	updateMonthlyStats();

	this.createElement = function() {
		var container = document.createElement('DIV');
		container.className = 'log';

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

		var amountNode = document.createTextNode(mod + this.amount.toString() + this.currency);
		amount.appendChild(amountNode);
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

		for (var i = 0; i < storages.length; i++) {
			switch (this.type) {
				case 'Acquisition':
					if (this.destination == storages[i].name) {
						transactionIconReciever += 'style="color:' + storages[i].color +'">';
						transactionIconReciever += storages[i].icon + '</i>';
						transactionNode = this.source + ' > ' + transactionIconReciever + ' ' + this.destination;
					}
					break;

				case 'Spending':
					if (this.source == storages[i].name) {
						transactionIconGiver += 'style="color:' + storages[i].color +'">';
						transactionIconGiver += storages[i].icon + '</i>';
						transactionNode = transactionIconGiver + ' ' + this.source + ' > ' + this.destination;
					}
					break;

				case 'Movement':
					isMovement = true;
					if (this.destination == storages[i].name) {
						transactionIconReciever += 'style="color:' + storages[i].color +'">';
						transactionIconReciever += storages[i].icon + '</i>';
					}

					if (this.source == storages[i].name) {
						transactionIconGiver += 'style="color:' + storages[i].color +'">';
						transactionIconGiver += storages[i].icon + '</i>';
					}
					break;

				default:
					transactionNode = this.source + ' > ' + this.destination;
					break;
			}
		}

		if (isMovement) transactionNode = transactionIconGiver + ' ' + this.source + ' > ' + transactionIconReciever + ' ' + this.destination;

		transaction.innerHTML = transactionNode;
		container.appendChild(transaction);

		//date
		var date = document.createElement('SPAN');
		date.className = 'logDate';
		var dateNode = document.createTextNode(this.date);
		date.appendChild(dateNode);
		container.appendChild(date);

		//sector icon
		var sectorIcon = document.createElement('i');
		sectorIcon.className = 'logSectorIcon material-icons';
		for (var i = 0; i < sectors.length; i++) {
			if (sectors[i].name == this.sector) {
				sectorIcon.innerText = sectors[i].icon;
				sectorIcon.style.color = sectors[i].color;
			}
		}
		container.appendChild(sectorIcon);

		this.element = container;
	}

	this.createElement();

	this.assignID = function() {
		
	}

	//automatically creates ID if log was created without one
	if (this.id == null) {
		this.assignID();
	}

	this.createJSON = function() {

	}
}