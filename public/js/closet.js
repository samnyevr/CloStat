$(document).ready(() =>{
	console.log("jQuery on");
	let clickTime=true;

	$.ajax({
		url: '/tops',
		type: 'GET',
		dataType: 'json',
		success: (data) =>{
			console.log('ajax success', data);


			$('.percentage').attr('src','/images/Stas.jpg');
						//$('#percentNumber').html('63%');
						//$('#items').html('{{#each data}} <h2 class="list">{{name}}</h2>{{/each}}');
						for(const item of data) {
							if (item.status=='clean') {
								$('#items').append(`<h4 class="list">${item.name}</h4>`);
							}
						}
					}

				})
	clickTime=false;

	$('#filter').click(() => {
		console.log('dirty');
		var myNode = document.getElementById("items");
		myNode.innerHTML = '';
		if (!clickTime) {

			$.ajax({
				url: '/tops',
				type: 'GET',
				dataType: 'json',
				success: (data) =>{
					console.log('ajax success', data);
					$('.percentage ').attr('src','/images/washing.jpg');
						//$('#percentNumber').html('37%');
						//$('#items').html('{{#each topsDirtty}} <h2 class="list">{{name}}</h2>{{/each}}');
						for(const item of data) {
							if (item.status=='dirty') {
								$('#items').append(`<h4 class="list">${item.name}</h4>`);
							}
						}
					}
				});
			clickTime=true;
		}
		else {
			$.ajax({
				url: '/tops',
				type: 'GET',
				dataType: 'json',
				success: (data) =>{
					console.log('ajax success', data);


					$('.percentage').attr('src','/images/Stas.jpg');
						//$('#percentNumber').html('63%');
						//$('#items').html('{{#each data}} <h2 class="list">{{name}}</h2>{{/each}}');
						for(const item of data) {
							if (item.status=='clean') {
								$('#items').append(`<h4 class="list">${item.name}</h4>`);
							}
						}
					}

				});
			clickTime=false;

		}
	});

});