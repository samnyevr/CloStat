/*
 * bottom.js shows the user the suitable bottom clothes by getting
 * the data from the database.There are two sections, one is the
 * recommended clothes, the other section is for other clean clothes.
 * This page also tracks what user wear for the day, user can choose
 * from the suggestion and then the data in the database will mark the
 * clothes as dirty and increase the usage.
 */
$(document).ready(() =>{
  const database = firebase.database();
  const user = localStorage['loggedInUser'];
  console.log("hello");

  /*
   * Get the temperature for recommandation
   */
  let tempName;
  $.ajax({
    url: 'getTemp',
    type: 'GET',
    dataType: 'JSON',
    success: (data)=>{
      tempName = data.temperature
      console.log(tempName);
    }
  });


  /*
   * Get the bottom clothes data from the database
   * and append the new data to the html file
   */
  database.ref('users/').on('value', (snapshot) => {
    const data = snapshot.val();
    const user = localStorage['loggedInUser'];

    try {
      const bottom = data[user].Clothes.Bottom;
      const topKey = Object.keys(data[user].Clothes.Bottom);
      var cleanArray = [];
      for(const key of topKey) {
        if (bottom[key].clean && bottom[key].temp == tempName) {
        cleanArray.push(key);
        }
      }

    console.log(cleanArray);


    let number=1;
    $('#accordion').html('');
    for(const clothes of cleanArray) {
      let imgUrl= bottom[clothes].photo;

      let usageNumber=data[user].Clothes.Bottom[`${clothes}`].numberUsage
      $('#accordion').append(` <div class="panel panel-default"> <div class="panel-heading">
      <p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${clothes}</p></div>
      <div class="round">
    					<input type="checkbox" id="checkbox${number}" value="${clothes}"/>
    					<label for="checkbox${number}"></label>
  					</div>
      <div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
      <img src="${imgUrl}" class="pic" width="120" src="/images/lightBlueJeans.jpeg">
      <p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
      number=number+1;

      }

      $('#accordionOther').html('');
      for(const clothes of topKey) {
        if (bottom[clothes].clean) {

          if(!cleanArray.includes(clothes)){

        let imgUrl= bottom[clothes].photo;

        let usageNumber=data[user].Clothes.Bottom[`${clothes}`].numberUsage
        $('#accordionOther').append(` <div class="panel panel-default"> <div class="panel-heading">
        <p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${clothes}</p></div>
        <div class="round">
      					<input type="checkbox" id="checkbox${number}" value="${clothes}"/>
      					<label for="checkbox${number}"></label>
    					</div>
        <div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
        <img src="${imgUrl}" class="pic" width="120" src="/images/lightBlueJeans.jpeg">
        <p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
        number=number+1;

        }
      }
    }
    } catch(err) {
      window.alert(`${user} did not have any bottoms in the closet!`);
      console.log(err);
    }

  });


  $(".submitButton").click(function() {
      console.log("clicked");
      getValueUsingClass();
	});

  /*
   * Get the values of users' choices
   */
  function getValueUsingClass(){

    console.log("data");
	/* declare an checkbox array */
	  var chkArray = [];



	/* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
	$(".round input:checked").each(function() {
    console.log("push");
    chkArray.push($(this).val());
	});

  /*
   * update the chosen clothes status to dirty and increase the usage in the database
   */
  database.ref(`users/${user}/Clothes/Bottom`).once('value', (snapshot) => {
  const data = snapshot.val();
  // console.log('You received some data!', data);
  for (const each of chkArray){
    let usage=data[each].numberUsage+1;
    console.log(usage);
    database.ref(`users/${user}/Clothes/Bottom/${each}` ).update({
       numberUsage: usage,
       clean:false
  });


  }
  });

	/* we join the array separated by the comma */
	var selected;
	selected = chkArray.join(',') ;

	/* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
	if(selected.length > 0){
	}else{
		alert("Please at least check one of the checkbox");

}


};
});
