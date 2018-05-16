$(document).ready(() =>{
	// Load the Visualization API and the corechart package.
	google.charts.load('current', {'packages':['corechart']});

	// Set a callback to run when the Google Visualization API is loaded.
	google.charts.setOnLoadCallback(drawChart("Top"));

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

function drawChart(part) {

	const database = firebase.database();
		database.ref('users/Bob/Clothes').once('value', (snapshot) => {
			const data = snapshot.val();
			const key = Object.keys(data);

			const list = new google.visualization.DataTable();
			list.addColumn('string', 'cloth');
			list.addColumn('number', 'weared');

			for(const item of Object.keys(data[part])){
				list.addRow([item, data[part][item].numberUsage]);
			}

			let option = {
				'title':'Bottom Usages',
				backgroundColor: { fill:'transparent' },
				height: 100,
				vAxis: {viewWindow:{min:0}}
			}

			let chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
			chart.draw(list, option);

		});
};
