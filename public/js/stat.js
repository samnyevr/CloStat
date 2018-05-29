$(document).ready(() =>{
	// Load the Visualization API and the corechart package.
	google.charts.load('current', {'packages':['corechart']});

	// Set a callback to run when the Google Visualization API is loaded.
	google.charts.setOnLoadCallback(drawBarChart("Top"));

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
		window.alert(`${user} did not have any tops in the closet!`);
		console.log(err);
	}
};
