$(document).ready(() =>{
	// Load the Visualization API and the corechart package.
	google.charts.load('current', {'packages':['corechart']});

	// Set a callback to run when the Google Visualization API is loaded.
	google.charts.setOnLoadCallback(drawBarChart("Top"));
	google.charts.setOnLoadCallback(drawBubbleChart());

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
