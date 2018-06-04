function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

let click=false;

$(document).ready(() =>{
	console.log("jQuery on");
	const database = firebase.database();

	// Close the dropdown if the user clicks outside of it
	window.onclick = function(event) {
		if (!event.target.matches('.dropbtn')) {
			var dropdowns = document.getElementsByClassName("dropdown-content");
			var i;
			for (i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				}
			}
		}
	}

	database.ref('users/').once('value', (snapshot) => {
		const data = snapshot.val();
		const user = localStorage['loggedInUser'];
		try {
			const top = data[user].Clothes.Top;
			const bottom = data[user].Clothes.Bottom;
			const keysT = Object.keys(top);
			const keysB = Object.keys(bottom);
			console.log(bottom);
			let number=1;
			for(const key of keysT) {

					let imgUrl= top[key].photo;
					let usageNumber=data[user].Clothes.Top[`${key}`].numberUsage
					$('.panel-group').append(`<div class="panel panel-default"> <div class="panel-heading">
						<p class="title" data-toggle="collapse" data-parent="#accordionCloset" href="#collapse${number}"> ${key}</p>
						</div>

						<div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
						<img src="${imgUrl}" class="pic" width="120">
						<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
					number=number+1;

			}
			for(const key of keysB) {
				console.log(number);
					let imgUrl= bottom[key].photo;
					let usageNumber=data[user].Clothes.Bottom[`${key}`].numberUsage
					$('.panel-group').append(`<div class="panel panel-default"> <div class="panel-heading">
						<p class="title" data-toggle="collapse" data-parent="#accordionCloset" href="#collapse${number}"> ${key}</p>

						</div>

						<div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
						<img src="${imgUrl}" class="pic" width="120">
						<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
					number=number+1;

			}

			$('#ALL').click(()=>{
				console.log("ALL");
				$('.dropbtn').text('All Clothes');
				let numberAll=1;
				$('.panel-group').html('');
				for(const key of keysT) {
					console.log(numberAll);
						let imgUrl= top[key].photo;
						let usageNumber=data[user].Clothes.Top[`${key}`].numberUsage
						$('.panel-group').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordionCloset" href="#collapse${numberAll}"> ${key}</p>

							</div>

							<div id="collapse${numberAll}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						numberAll=numberAll+1;

				}
				for(const key of keysB) {
					console.log(numberAll);
						let imgUrl= bottom[key].photo;
						let usageNumber=data[user].Clothes.Bottom[`${key}`].numberUsage
						$('.panel-group').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordionCloset" href="#collapse${numberAll}"> ${key}</p>

							</div>

							<div id="collapse${numberAll}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						numberAll=numberAll+1;

				}
			});


			$('#CT').click(()=>{
				console.log("CT");
				$('.dropbtn').text('Clean Top');
				let numberCT=1;
				$('.panel-group').html('');
				for(const key of keysT) {
					if (top[key].clean) {
						console.log(numberCT);
						let imgUrl= top[key].photo;
						let usageNumber=data[user].Clothes.Top[`${key}`].numberUsage
						$('.panel-group').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordionCloset" href="#collapse${numberCT}"> ${key}</p>

							</div>

							<div id="collapse${numberCT}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						numberCT=numberCT+1;
					}
				}
			});

			$('#CB').click(()=>{
				$('.dropbtn').text('Clean Bottom');
				console.log("CB");
				$('.panel-group').html('');
				let numberCB=1;
				for(const key of keysB) {
					if (bottom[key].clean) {
						let imgUrl= bottom[key].photo;
						let usageNumber=data[user].Clothes.Bottom[`${key}`].numberUsage
						$('.panel-group').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordionCloset" href="#collapse${numberCB}"> ${key}</p>

							</div>

							<div id="collapse${numberCB}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						numberCB=numberCB+1;
					}
				}
			});

			$('#DT').click(()=>{
				console.log("DT");
				$('.dropbtn').text('Dirty Top');
				$('.panel-group').html('');
				let numberDT=1;
				for(const key of keysT) {
					if (!top[key].clean) {
						let imgUrl= top[key].photo;
						let usageNumber=data[user].Clothes.Top[`${key}`].numberUsage
						$('.panel-group').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordionCloset" href="#collapse${numberDT}"> ${key}</p>

							</div>

							<div id="collapse${numberDT}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						numberDT=numberDT+1;
					}
				}
			});


			$('#DB').click(()=>{
				$('.dropbtn').text('Dirty Bottom');
				console.log("DB");
				$('.panel-group').html('');
				let numberDB=1;
				for(const key of keysB) {
					if (!bottom[key].clean) {
						let imgUrl= bottom[key].photo;
						let usageNumber=data[user].Clothes.Bottom[`${key}`].numberUsage
						$('.panel-group').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordioncloset" href="#collapse${numberDB}"> ${key}</p>

							</div>

							<div id="collapse${numberDB}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						numberDB=numberDB+1;
					}
				}
			});


			google.charts.load('current', {'packages':['corechart']});
			google.charts.setOnLoadCallback(drawChart);
			let topClean = [];
			let bottomClean = [];
			let topDirty = [];
			let bottomDirty = [];

			for(const key of keysT) {
				if (top[key].clean) {
					  topClean.push(key);
					}
					else{
						topDirty.push(key);
					}
				}
				for(const key of keysB) {
					if (bottom[key].clean) {
						  bottomClean.push(key);
						}
						else{
							bottomDirty.push(key);
						}
					}

			function drawChart() {

				var data = google.visualization.arrayToDataTable([
					['Task', 'Hours per Day'],
					['Clean Top',    topClean.length],
					['Clean Bottom',    bottomClean.length],
					['Dirty Top',   topDirty.length],
					['Dirty Bottom',  bottomDirty.length],

				]);

				var options = {
					legend:'none',
					backgroundColor: { fill:'transparent' }
				};

				var chart = new google.visualization.PieChart(document.getElementById('piechart'));

				chart.draw(data, options);
			}
		} catch(err) {
			console.log(err);
		}

	});
});

$('.weatherBar').click(()=>{

	$('.weatherBar').attr('src','/images/weatherActive.png');
	click=true;

});

$('.statBar').click(()=>{
	$('.statBar').attr('src','/images/statActive.png');
	click=true;

});
