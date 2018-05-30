$(document).ready(() =>{
	// Load the Visualization API and the corechart package.
	google.charts.load('current', {'packages':['corechart']});
	google.charts.load("current", {packages:["calendar"]});

	// Set a callback to run when the Google Visualization API is loaded.
	google.charts.setOnLoadCallback(drawBarChart("Top"));
	google.charts.setOnLoadCallback(drawBubbleChart());
	google.charts.setOnLoadCallback(drawCalendar());
	google.charts.setOnLoadCallback(drawColumnChart("Top"));

	// Callback that creates and populates a data table,
	// instantiates the pie chart, passes in the data and
	// draws it.


	$('.weatherBar').click(()=>{

			$('.weatherBar').attr('src','/images/weatherActive.png');
			click=true;

	});

	$('.closetBar').click(()=>{
			$('.closetBar').attr('src','/images/closetActive.png');
			click=true;

	});
});

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
				chartArea:{width:'50%'}
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

			let chart = new google.visualization.BubbleChart(document.getElementById('chart_div2'));
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
				height: 500,
				calendar: { cellSize: 10},

			}

			let chart = new google.visualization.Calendar(document.getElementById('chart_div3'));
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
				width: 400
			}

			let chart = new google.visualization.ColumnChart(document.getElementById('chart_div4'));
			chart.draw(list, option);

		});
	} catch(err) {
		window.alert(`${user} did not have any ${part} in the closet!`);
		console.log(err);
	}
};
