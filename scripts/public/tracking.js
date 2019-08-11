function refreshTracking() {
	graph.innerText = '';
	chart.innerText = '';
	legend.innerText = '';

	if (logs.length < 1) return;

	//get current month's spending data
	var date = new Date();
	var month = date.getMonth();
	var dates = [];

	for (var i = 0; i < logs.length; i++) {
		var logDate = new Date(logs[i].date);
		if (logDate.getMonth() == month && logs[i].type == 'Spending') dates.push(logs[i]);
	}

	createGraph(dates);
	createChart();
	createLegend();
}

function createGraph(dates) {
	//create array which holds dates, and logs for each date
	var dateCount = daysInMonth(new Date().getMonth(), new Date().getFullYear());
	var days = new Array(dateCount);
	for (var i = 0; i < days.length; i++) {
		days[i] = [];
	}

	var dayNumber = 0;
	var previousDate = new Date(dates[0].date).getDate();

	//days[day][log][0: amount, 1:currency, 2:sector] (days are offset by 1 as arrays start at 0)
	for (var i = 0; i < dateCount; i++) {
		for (var j = 0; j < dates.length; j++) {
			if (dates[j]) {
				if ((new Date(dates[j].date).getDate() - 1) == i) {
					days[i].push([dates[j].amount, dates[j].currency, dates[j].sector]);
				}
			}
		}
	}

	//calculate total spendings for each day (in $)
	var daySpendings = new Array(dateCount);

	for (var i = 0; i < daySpendings.length; i++) {
		daySpendings[i] = 0;
	}

	for (var i = 0; i < dateCount; i++) {
		for (var j = 0; j < days[i].length; j++) {
			daySpendings[i] += convertCurrency(days[i][j][1], days[i][j][0], '$');
		}
	}

	//calculate highest price point of the month (in $)
	var highest = 0;

	for (var i = 0; i < daySpendings.length; i++) {
		if (daySpendings[i] > highest) highest = daySpendings[i];
	}

	var lines = document.createElement('DIV');
	lines.className = 'graphLines';
	var linesText = '<svg class="graphLinesSVG"><path class="graphLinesSVGPath" d="M0,' + (graphHeight - (daySpendings[0] / (highest + (highest / 10)) * graphHeight) - 2) + ' ';

	//create graph point for each day
	for (var i = 1; i < dateCount; i++) {
		linesText += 'L' + (graph.offsetWidth / dateCount) * (i + 1) + ',' + (graphHeight - (daySpendings[i] / (highest + (highest / 10)) * graphHeight) - 2) + ' ';
	}

	linesText += '"></path>';
	lines.innerHTML = linesText;
	graph.appendChild(lines);

	var heightMarker = document.createElement('SPAN');
	heightMarker.className = 'graphHeightMarker';
	if (currency != '¥') heightMarker.innerText = convertCurrency('$', highest, currency).toFixed(2) + currency;
	else heightMarker.innerText = convertCurrency('$', highest, currency) + currency;

	graph.appendChild(heightMarker);
}

function createChart() {
	//calculate percentage of each sector's contribution
	var sectorContributions = new Array(sectors.length);
	for (var i = 0; i < sectorContributions.length; i++) {
		sectorContributions[i] = 0;
	}

	var degrees = new Array(sectors.length);

	for (var i = 0; i < sectors.length; i++) {
		for (var j = 0; j < logs.length; j++) {
			if (logs[j].sector == sectors[i].name && logs[j].type == 'Spending') sectorContributions[i] += convertCurrency(logs[j].currency, logs[j].amount, '$');
		}
	}

	//get total spendings
	var total = 0;
	for (var i = 0; i < logs.length; i++) {
		if (logs[i].type == 'Spending') total += convertCurrency(logs[i].currency, logs[i].amount, '$');
	}

	//degrees[percentage, color];
	for (var i = 0; i < sectorContributions.length; i++) {
		degrees[i] = [sectorContributions[i] / total, sectors[i].color];
	}

	degrees.sort();
	degrees.reverse();

	//create chart
	var circle = document.createElement('DIV');
	circle.className = 'chartCircle';

	var path = '<svg class="chartCircleSVG">';
	var degree = 0;
	var oldDegree = 0;

	//scale circle to smallest aspect
	chart.style.height = chart.offsetWidth + 'px';
	var radius = (chart.offsetWidth - 80) / 2;
	var remainingSpace = ((chart.offsetHeight - 80) / 2) - radius;

	for (var i = 0; i < degrees.length; i++) {
		degree = remap(degrees[i][0], 0, 1, 0, Math.PI * 2);
		path += '<g transform="translate(' + radius + ',' + (radius + remainingSpace) + ') rotate(-90) scale(1 -1)">';
		path += '<path d="' + createSvgArc(0, 0, radius, oldDegree, degree + oldDegree) + '" fill="' + degrees[i][1] + '"/></g>';
		oldDegree += degree;
	}

	path += '<circle cx="50%" cy="50%" r="' + (radius - 10) + '" fill="#fafafa"/></svg>';

	circle.innerHTML = path;
	chart.appendChild(circle);
}

function createLegend() {
	for (var i = 0; i < sectors.length; i++) {
		var spendings = 0;

		for (var j = 0; j < logs.length; j++) {
			if (logs[j].type == 'Spending' && logs[j].sector == sectors[i].name) {
				spendings += convertCurrency(logs[j].currency, logs[j].amount, currency);
			}
		}

		if (spendings == 0) continue;

		if (sectors[i])
		var container = document.createElement('DIV');
		container.className = 'legendItem';

		var color = document.createElement('DIV');
		color.className = 'legendColor';
		color.style.backgroundColor = sectors[i].color;
		container.appendChild(color);

		var text = document.createElement('SPAN');
		text.className = 'legendText';
		text.innerText = sectors[i].name;
		container.appendChild(text);

		var spendingsText = document.createElement('SPAN');
		spendingsText.className = 'legendSpendings';
		if (currency != '¥') spendings = parseFloat(spendings).toFixed(2);
		spendingsText.innerText = '-' + spendings + currency;
		container.appendChild(spendingsText);

		legend.appendChild(container);
	}
}

function createSvgArc(x, y, r, startAngle, endAngle) {
	if (startAngle > endAngle){
		s = startAngle;
		startAngle = endAngle;
		endAngle = s;
	}

	if (endAngle - startAngle > Math.PI * 2) endAngle = Math.PI * 1.99999;

	if (endAngle - startAngle <= Math.PI) largeArc = 0;
	else largeArc = 1;

	 arc = [
		'M', x, y,
		'L', x + (Math.cos(startAngle) * r), y - (Math.sin(startAngle) * r), 
		'A', r, r, 0, largeArc, 0, x + (Math.cos(endAngle) * r), y - (Math.sin(endAngle) * r) + 0.001,
		'L', x, y
	];

	return arc.join(' ');
}