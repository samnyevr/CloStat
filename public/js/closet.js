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
			let number=1;
			$('.panel-group').html('');
			for(const key of keysT) {
				if (top[key].clean) {
					let imgUrl= top[key].photo;
					let usageNumber=data[user].Clothes.Top[`${key}`].numberUsage
					$('#items').append(`<div class="panel panel-default"> <div class="panel-heading">
						<p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${key}</p>

						</div>

						<div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
						<img src="${imgUrl}" class="pic" width="120">
						<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
					number=number+1;
				}
			}
			for(const key of keysB) {
				if (bottom[key].clean) {
					let imgUrl= bottom[key].photo;
					let usageNumber=data[user].Clothes.Bottom[`${key}`].numberUsage
					$('#items').append(`<div class="panel panel-default"> <div class="panel-heading">
						<p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${key}</p>

						</div>

						<div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
						<img src="${imgUrl}" class="pic" width="120">
						<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
					number=number+1;
				}
			}

			$('#ALL').click(()=>{
				console.log("CT");
				var myNode = document.getElementById("items");
				myNode.innerHTML = '';
				let number=1;
				$('.panel-group').html('');
				for(const key of keysT) {
					if (top[key].clean) {
						let imgUrl= top[key].photo;
						let usageNumber=data[user].Clothes.Top[`${key}`].numberUsage
						$('#items').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${key}</p>

							</div>

							<div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						number=number+1;
					}
				}
				for(const key of keysB) {
					if (bottom[key].clean) {
						let imgUrl= bottom[key].photo;
						let usageNumber=data[user].Clothes.Bottom[`${key}`].numberUsage
						$('#items').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${key}</p>

							</div>

							<div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						number=number+1;
					}
				}
			});
			
			
			$('#CT').click(()=>{
				console.log("CT");
				var myNode = document.getElementById("items");
				myNode.innerHTML = '';
				let number=1;
				$('.panel-group').html('');
				for(const key of keysT) {
					if (top[key].clean) {
						let imgUrl= top[key].photo;
						let usageNumber=data[user].Clothes.Top[`${key}`].numberUsage
						$('#items').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${key}</p>

							</div>

							<div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						number=number+1;
					}
				}
			});

			$('#CB').click(()=>{
				console.log("CB");
				var myNode = document.getElementById("items");
				myNode.innerHTML = '';
				let number=1;
				for(const key of keysB) {
					if (bottom[key].clean) {
						let imgUrl= bottom[key].photo;
						let usageNumber=data[user].Clothes.Bottom[`${key}`].numberUsage
						$('#items').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${key}</p>

							</div>

							<div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						number=number+1;
					}
				}
			});

			$('#DT').click(()=>{
				console.log("CT");
				var myNode = document.getElementById("items");
				myNode.innerHTML = '';
				$('.panel-group').html('');
				let number=1;
				for(const key of keysT) {
					if (!top[key].clean) {
						let imgUrl= top[key].photo;
						let usageNumber=data[user].Clothes.Top[`${key}`].numberUsage
						$('#items').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${key}</p>

							</div>

							<div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						number=number+1;
					}
				}
			});

			$('#DB').click(()=>{
				console.log("CT");
				var myNode = document.getElementById("items");
				myNode.innerHTML = '';
				let number=1;
				for(const key of keysB) {
					if (!bottom[key].clean) {
						let imgUrl= bottom[key].photo;
						let usageNumber=data[user].Clothes.Bottom[`${key}`].numberUsage
						$('#items').append(`<div class="panel panel-default"> <div class="panel-heading">
							<p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${key}</p>

							</div>

							<div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
							<img src="${imgUrl}" class="pic" width="120">
							<p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
						number=number+1;
					}
				}
			});

			google.charts.load('current', {'packages':['corechart']});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {

				var data = google.visualization.arrayToDataTable([
					['Task', 'Hours per Day'],
					['Clean Top',     7],
					['Clean Bottom',      3],
					['Dirty Top',  7],
					['Dirty Bottom', 2],

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
