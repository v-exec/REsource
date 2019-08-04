function Sector(name, icon, color) {
	this.name = name;
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
		text.innerHTML = this.name;

		container.appendChild(icon);
		container.appendChild(text);
		this.element = container;
	}

	this.createElement();
}

function findSector(sectoreName) {
	for (var i = 0; i < sectors.length; i++) {
		if (sectors[i].name == sectorName) return sectors[i];
	}
}