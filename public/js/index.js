window.localStorage.setItem("weather", document.getElementsByClassName("weather").value);
var temp= window.localStorage.getItem("weather");
console.log(temp);


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
	$('.closetBar').click(()=>{

			$('.closetBar').attr('src','/images/closetActive.png');
			click=true;

	})

	$('.statBar').click(()=>{
			$('.statBar').attr('src','/images/statActive.png');
			click=true;

	})



});
