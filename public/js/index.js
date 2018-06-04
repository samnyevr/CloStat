/*
 * Filename: index.js
 * Description: The home page of the website
 * Note: This page will navigate to other pages so
 * most of the buttons are interacting with other pages
 */
localStorage['weather'] = document.getElementsByClassName('weather').value;
var temp = localStorage['weather'];
console.log(temp);


$(document).ready(() =>{
	console.log("jQuery On!");

	$('.closetBar').click(()=>{

		$('.closetBar').attr('src','/images/closetActive.png');
		click=true;

	})

	$('.statBar').click(()=>{
		$('.statBar').attr('src','/images/statActive.png');
		click=true;

	})

	$('#next').click(()=>{
		$.ajax({
			url: 'suggestion',
			type: 'GET',
			dataType: 'json',
			success: (data) =>{
				console.log("success", data);
			}
		});
	});



});
