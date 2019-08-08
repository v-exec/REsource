function Sector(name, icon, color) {
	this.name = name;
	this.icon = icon;
	this.color = color;

	this.element;
	this.deleter;
	this.timer;

	this.deleteToggled = false;

	this.createElement = function(self) {
		var container = document.createElement('A');
		container.href = "#";
		container.className = 'itemsListItem';
		container.addEventListener('click', function() {
			self.toggleDelete(self);
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

		var deleteContainer = document.createElement('A');
		deleteContainer.href = '#';
		deleteContainer.addEventListener('click', function(e) {
			e.stopPropagation();
			deleteSector(self);
		});
		deleteContainer.className = 'itemsListDeleteButton';
		deleteContainer.innerHTML = '<i class="itemsListDeleteIcon material-icons">remove_circle</i>';
		container.appendChild(deleteContainer);

		this.deleter = deleteContainer;
		this.element = container;
	}

	this.createElement(this);

	this.toggleDelete = function(self) {
		//close toggle if open
		if (self.deleteToggled) {
			self.deleteToggled = false;

			self.element.style.backgroundColor = '#fafafa';
			self.element.children[0].style.color = self.color;
			self.element.children[1].style.color = '#ccc';

			self.timer = setTimeout(function() {
				self.deleter.style.display = 'none';
			}, 1000);
			return;
		}

		//close all sector delete toggles
		closeAllSectorDeletes();

		self.deleteToggled = true;

		//toggle delete
		clearTimeout(self.timer);
		self.element.style.backgroundColor = '#ccc';
		self.element.children[0].style.color = '#fafafa';
		self.element.children[1].style.color = '#fafafa';
		self.deleter.style.display = 'inline-block';
	}

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

function closeAllSectorDeletes() {
	for (var i = 0; i < sectors.length; i++) {
		if (sectors[i].deleteToggled) {
			sectors[i].toggleDelete(sectors[i]);
		}
	}
}