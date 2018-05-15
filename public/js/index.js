$(document).ready(() =>{
	console.log("jQuery On!");
	$.ajax({
		url: 'suggestion',
		type: 'GET',
		dataType: 'json',
		success: (data) =>{
			console.log("success", data);
		}
	});
});