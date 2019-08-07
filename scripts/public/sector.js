function Sector(name, icon, color) {
	this.name = name;
	this.icon = icon;
	this.color = color;

	this.element;

	this.createElement = function(self) {
		var container = document.createElement('A');
		container.href = "#";
		container.className = 'itemsListItem';
		container.addEventListener('click', function() {
			fillSectorForm(self);
		});

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

	this.createElement(this);

	this.createJSON = function() {
		var obj = new Object();

		obj.name = this.name;
		obj.icon = this.icon;
		obj.color = this.color;
		
		return JSON.stringify(obj);
	}
}

function findSector(sectorName) {
	for (var i = 0; i < sectors.length; i++) {
		if (sectors[i].name == sectorName) return sectors[i];
	}
	return false;
}