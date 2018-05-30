$(document).ready(() =>{
	// Load the Visualization API and the corechart package.
	google.charts.load('current', {'packages':['corechart']});
	google.charts.load("current", {'packages':["calendar"]});
	google.charts.load('current', {'packages':['scatter']});
	google.charts.load('current', {'packages':['treemap']});

	// Set a callback to run when the Google Visualization API is loaded.

	google.charts.setOnLoadCallback(drawBarChart("Top"));

	$("#diffForm").hide();

	/*
	google.charts.setOnLoadCallback(drawIntervalChart());
	google.charts.setOnLoadCallback(drawLineChart());
	google.charts.setOnLoadCallback(drawScatterChart());
	*/

	// Callback that creates and populates a data table,
	// instantiates the pie chart, passes in the data and
	// draws it.
});

function drawChart(chart){
	if(chart == "Bar"){
		$("#barForm").show();
		$("#diffForm").hide();
		google.charts.setOnLoadCallback(drawBarChart("Top"));
	}
	else if(chart == "Bubble"){
		$("#barForm").hide();
		$("#diffForm").hide();
		google.charts.setOnLoadCallback(drawBubbleChart());
	}
	else if(chart == "Calendar"){
		$("#barForm").hide();
		$("#diffForm").hide();
		google.charts.setOnLoadCallback(drawCalendar());
	}
	else if(chart == "Column"){
		$("#barForm").hide();
		$("#diffForm").hide();
		google.charts.setOnLoadCallback(drawColumnChart("Top"));
	}
	else if(chart == "Diff"){
		$("#barForm").hide();
		$("#diffForm").show();
		google.charts.setOnLoadCallback(drawDiffChart());
	}
	else if(chart == "TreeMap"){
		$("#barForm").hide();
		$("#diffForm").hide();
		google.charts.setOnLoadCallback(drawTreeMap());
	}
}

function drawBarChart(part) {

	const user = localStorage['loggedInUser'];
	const database = firebase.database();
	try {
		database.ref(`users/${user}/Clothes`).once('value', (snapshot) => {
			const data = snapshot.val();
			if(data == null) {
				window.alert(`${user} did not have any clothes in the closet!`);
				return;
			}
			const key = Object.keys(data);

			const list = new google.visualization.DataTable();
			list.addColumn('string', 'cloth');
			list.addColumn('number', 'weared');

			for(const item of Object.keys(data[part])){
				list.addRow([item, data[part][item].numberUsage]);
			}

			let option = {
				'title':`${part}` + " Usage",
				backgroundColor: { fill:'transparent' },
				height: 400,
				bar: { groupWidth: "61%" },
				chartArea:{width:'50%'},
				hAxis:{
					viewWindow:{
						min: 0
					}
				}
			}

			let chart = new google.visualization.BarChart(document.getElementById('chart_div1'));
			chart.draw(list, option);

		});
	} catch(err) {
		window.alert(`${user} did not have any ${part} in the closet!`);
		console.log(err);
	}
};

function drawBubbleChart() {

	const user = localStorage['loggedInUser'];
	const database = firebase.database();
	try {
		database.ref(`users/${user}/Clothes`).once('value', (snapshot) => {
			const data = snapshot.val();
			if(data == null) {
				window.alert(`${user} did not have any clothes in the closet!`);
				return;
			}
			const key = Object.keys(data);

			const list = new google.visualization.DataTable();
			list.addColumn('string', 'ID');
			list.addColumn('number', 'num');
			list.addColumn('number', 'Temp');
			list.addColumn('string', 'Part');
			list.addColumn('number', 'Usage');

			let num = 0;
			for(const item of Object.keys(data["Top"])){
				list.addRow([item, num, data["Top"][item].numberUsage, "top",data["Top"][item].numberUsage]);
				num = num+2;
			}
			num = 0;
			for(const item of Object.keys(data["Bottom"])){
				list.addRow([item, num, data["Bottom"][item].numberUsage, "bottom", data["Bottom"][item].numberUsage]);
				num = num+2;
			}
			num = 0;
			for(const item of Object.keys(data["Accessory"])){
				list.addRow([item, num, data["Accessory"][item].numberUsage, "accessory", data["Accessory"][item].numberUsage]);
				num = num+2;
			}

			let option = {
				'title': " Usage",
				backgroundColor: { fill:'transparent' },
				height: 500,
				hAxis: {
								viewWindow: { min: -2, max: 20},
								baselineColor: {color: 'transparent'},
								gridlines: {color: 'transparent'},
								textPosition: 'none'
				},
				vAxis: {
								viewWindow: { min: -2, max: 20},
								baselineColor: {fill: 'transparent'},
								gridlines: {color: 'transparent'},
								textPosition: 'none'
				}
			}

			let chart = new google.visualization.BubbleChart(document.getElementById('chart_div1'));
			chart.draw(list, option);

		});
	} catch(err) {
		window.alert(`${user} did not have any tops in the closet!`);
		console.log(err);
	}
};

function drawCalendar() {

	const user = localStorage['loggedInUser'];
	const database = firebase.database();
	try {
		database.ref(`users/${user}/Clothes`).once('value', (snapshot) => {
			const data = snapshot.val();
			if(data == null) {
				window.alert(`${user} did not have any clothes in the closet!`);
				return;
			}
			const key = Object.keys(data);

			const list = new google.visualization.DataTable();
				list.addColumn({ type: 'date', id: 'Date' });
       	list.addColumn({ type: 'number', id: 'Usage' });
       	list.addRows([
          [ new Date(2012, 3, 13), 37032 ],
          [ new Date(2012, 3, 14), 38024 ],
          [ new Date(2012, 3, 15), 38024 ],
          [ new Date(2012, 3, 16), 38108 ],
          [ new Date(2012, 3, 17), 38229 ],
          [ new Date(2013, 9, 4), 38177 ],
          [ new Date(2013, 9, 5), 38705 ],
          [ new Date(2013, 9, 12), 38210 ],
          [ new Date(2013, 9, 13), 38029 ],
          [ new Date(2013, 9, 19), 38823 ],
          [ new Date(2013, 9, 23), 38345 ],
          [ new Date(2013, 9, 24), 38436 ],
          [ new Date(2013, 9, 30), 38447 ]
        ]);

			let option = {
				'title': " Usage",
				backgroundColor: { fill:'transparent' },
				calendar: { cellSize: 6},

			}

			let chart = new google.visualization.Calendar(document.getElementById('chart_div1'));
			chart.draw(list, option);

		});
	} catch(err) {
		window.alert(`${user} did not have any tops in the closet!`);
		console.log(err);
	}
};

function drawColumnChart(part) {

	const user = localStorage['loggedInUser'];
	const database = firebase.database();
	try {
		database.ref(`users/${user}/Clothes`).once('value', (snapshot) => {
			const data = snapshot.val();
			if(data == null) {
				window.alert(`${user} did not have any clothes in the closet!`);
				return;
			}
			const key = Object.keys(data);

			const list = new google.visualization.DataTable();
			list.addColumn('string', 'cloth');
			list.addColumn('number', 'weared');

			for(const item of Object.keys(data[part])){
				list.addRow([item, data[part][item].numberUsage]);
			}

			let option = {
				'title':`${part}` + " Usage",
				backgroundColor: { fill:'transparent' },
				height: 400,
				width: "100%"
			}

			let chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
			chart.draw(list, option);

		});
	} catch(err) {
		window.alert(`${user} did not have any ${part} in the closet!`);
		console.log(err);
	}
};

function drawDiffChart() {

	const user = localStorage['loggedInUser'];
	const database = firebase.database();
	try {
		database.ref(`users/${user}/Clothes`).once('value', (snapshot) => {
			const data = snapshot.val();
			if(data == null) {
				window.alert(`${user} did not have any clothes in the closet!`);
				return;
			}
			const part1 = document.getElementById("DiffChart1").value;
			const part2 = document.getElementById("DiffChart2").value;
			const key = Object.keys(data);

			const list1 = new google.visualization.DataTable();
			list1.addColumn('string', 'temp');
			list1.addColumn('number', 'weared');
			list1.addColumn({type:'string', role: 'tooltip'});

			const keep1 = {hot:0, cold:0, warm:0};
			for(const item of Object.keys(data[part1])){
				if(data[part1][item].temp == "hot")
					{keep1.hot++;}
				else if(data[part1][item].temp == "cold")
					{keep1.cold++;}
				else
					{keep1.warm++;}
			}
			list1.addRow(["hot", keep1.hot, `${part1}`]);
			list1.addRow(["cold", keep1.cold, `${part1}`]);
			list1.addRow(["warm", keep1.warm, `${part1}`]);

			const list2 = new google.visualization.DataTable();
			list2.addColumn('string', 'temp');
			list2.addColumn('number', 'weared');
			list2.addColumn({type:'string', role: 'tooltip'});

			const keep2 = {hot:0, cold:0, warm:0};
			for(const item of Object.keys(data[part2])){
				if(data[part2][item].temp == "hot")
					{keep2.hot++;}
				else if(data[part2][item].temp == "cold")
					{keep2.cold++;}
				else
					{keep2.warm++;}
			}
			list2.addRow(["hot", keep2.hot, `${part2}`]);
			list2.addRow(["cold", keep2.cold, `${part2}`]);
			list2.addRow(["warm", keep2.warm, `${part2}`]);


			let option = {
				'title':`${part1} vs ${part2} Temperature`,
				backgroundColor: { fill:'transparent' },
				width: "100%"
			}

			let chartDiff = new google.visualization.PieChart(document.getElementById('chart_div1'));
			//let chart = new google.visualization.ScatterChart(document.getElementById('chart_div5'));
			let diffData = chartDiff.computeDiff(list1, list2);
			chartDiff.draw(diffData, option);

		});
	} catch(err) {
		window.alert(`${user} did not have any ${part} in the closet!`);
		console.log(err);
	}
};

function drawTreeMap() {

	const user = localStorage['loggedInUser'];
	const database = firebase.database();
	try {
		database.ref(`users/${user}/Clothes`).once('value', (snapshot) => {
			const data = snapshot.val();
			if(data == null) {
				window.alert(`${user} did not have any clothes in the closet!`);
				return;
			}
			const key = Object.keys(data);

			const list = new google.visualization.DataTable();
			list.addColumn('string', 'Category');
			list.addColumn('string', 'Parent');
			list.addColumn('number', 'size');

			list.addRow(['Closet', null, 0]);
			list.addRow(['Top', 'Closet', data["Top"].length]);
			list.addRow(['Bottom', 'Closet', data["Bottom"].length]);
			list.addRow(['Accessory', 'Closet', data["Accessory"].length]);

			for(const item of Object.keys(data["Top"])){
				list.addRow([item, 'Top', data["Top"][item].numberUsage]);
			}
			for(const item of Object.keys(data["Bottom"])){
				list.addRow([item, 'Bottom', data["Bottom"][item].numberUsage]);
			}
			for(const item of Object.keys(data["Accessory"])){
				list.addRow([item, 'Accessory', data["Accessory"][item].numberUsage]);
			}

			let option = {
				'title': 'TreeMap of All clothes',
				backgroundColor: { fill:'transparent' },
				height: 400,
				width: "100%",
			}

			let chart = new google.visualization.TreeMap(document.getElementById('chart_div1'));
			chart.draw(list, option);

		});
	} catch(err) {
		window.alert(`${user} did not have any ${part} in the closet!`);
		console.log(err);
	}
};
