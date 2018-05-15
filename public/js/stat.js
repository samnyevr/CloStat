$(document).ready(() =>{
	// Load the Visualization API and the corechart package.
	google.charts.load('current', {'packages':['corechart']});

	// Set a callback to run when the Google Visualization API is loaded.
	google.charts.setOnLoadCallback(drawChart);

	// Callback that creates and populates a data table,
	// instantiates the pie chart, passes in the data and
	// draws it.


	function drawChart() {

		$.ajax({
			url: '/tops',
			type: 'GET',
			dataType: 'json',
			success: (data) =>{

				const list = new google.visualization.DataTable();
				list.addColumn('string', 'cloth');
				list.addColumn('number', 'weared');
				for(const item of data) {
					list.addRow([item.name,item.numberUsage]);
				}

				// Instantiate and draw our chart, passing in some options.
				let chart = new google.visualization.BarChart(document.getElementById('chart_div'));
				chart.draw(list);
			}
		});


	}
});