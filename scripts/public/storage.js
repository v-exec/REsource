function Storage(name, amount, icon, color) {
	this.name = name;
	this.amount = amount;
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
}

function findStorage(storageName) {
	for (var i = 0; i < storages.length; i++) {
		if (storages[i].name == storageName) return storages[i];
	}
}