function Storage(name, amount, storageCurrency, icon, color) {
	this.name = name;
	this.amount = amount;
	this.currency = storageCurrency;
	this.icon = icon;
	this.color = color;

	this.element;

	this.createElement = function() {
		var container = document.createElement('A');
		container.className = 'itemsListItem';
		container.href = "#";

		var icon = document.createElement('I');
		icon.className = 'itemsListItemIcon material-icons';
		icon.style = 'color: ' + this.color;
		icon.innerText = this.icon;

		var text = document.createElement('SPAN');
		text.className = 'itemsListItemText';
		text.innerText = this.name;

		container.appendChild(icon);
		container.appendChild(text);
		this.element = container;
	}

	this.createElement();

	this.createJSON = function() {
		var obj = new Object();

		obj.name = this.name;
		obj.amount = Number(this.amount);
		obj.currency = this.currency;
		obj.icon = this.icon;
		obj.color = this.color;
		
		return JSON.stringify(obj);
	}
}

function findStorage(storageName) {
	for (var i = 0; i < storages.length; i++) {
		if (storages[i].name == storageName) return storages[i];
	}
}