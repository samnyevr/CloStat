$(document).ready(() =>{
  const database = firebase.database();
  const user = localStorage['loggedInUser'];
  console.log("hello");


  database.ref('users/').on('value', (snapshot) => {
    console.log("first once");
    const data = snapshot.val();
    const user = localStorage['loggedInUser'];
    const top = data[user].Clothes.Top;
    const bottom = data[user].Clothes.Bottom;
    const topKey = Object.keys(data[user].Clothes.Top);
    const bottomKey = Object.keys(data[user].Clothes.Bottom);
    var topArray = [];
    var bottomArray = [];
    for(const keyT of topKey) {
      if (!top[keyT].clean) {
       topArray.push(keyT);
      }
    }
    for(const keyB of bottomKey) {
      if (!bottom[keyB].clean) {
       bottomArray.push(keyB);
      }
    }
    console.log(topArray);
    console.log(bottomArray);

    let number=1;

    $('.panel-group').html('');
    for(const clothes of topArray) {
      let imgUrlTop= top[clothes].photo;
      let usageNumberTop=data[user].Clothes.Top[`${clothes}`].numberUsage
      $('.panel-group').append(` <div class="panel panel-default"> <div class="panel-heading">
      <p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${clothes}</p>
      </div>
      <div class="round">

          <input type="checkbox" id="checkbox${number}" value="${clothes}" />
    				<label for="checkbox${number}"> </label>
              </div>

      <div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
      <img src="${imgUrlTop}" class="pic" width="120" src="/images/blueShirt.jpg">
      <p class="words">You have worn this shirt ${usageNumberTop} times this month. </p></div></div></div>`);
      number=number+1;

    }
    for(const clothes of bottomArray) {
      let imgUrlBottom= bottom[clothes].photo;
      let usageNumberBottom=data[user].Clothes.Bottom[`${clothes}`].numberUsage
      $('.panel-group').append(` <div class="panel panel-default"> <div class="panel-heading">
      <p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${clothes}</p>
      </div>
      <div class="round">

          <input type="checkbox" id="checkbox${number}" value="${clothes}" />
    				<label for="checkbox${number}"> </label>
              </div>

      <div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
      <img src="${imgUrlBottom}" class="pic" width="120" src="/images/blueShirt.jpg">
      <p class="words">You have worn this shirt ${usageNumberBottom} times this month. </p></div></div></div>`);
      number=number+1;

    }


});




  $(".submitButton").click(function() {
      console.log("clicked");
      getValueUsingClass();
	});

  function getValueUsingClass(){
    console.log("data");
  /* declare an checkbox array */
    var chkArray = [];
  /* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
  $(".round input:checked").each(function() {
    console.log("push");
    chkArray.push($(this).val());

  });

  console.log(chkArray);
  console.log(user);
  database.ref(`users/${user}/Clothes`).once('value', (snapshot) => {
  const data = snapshot.val();
  console.log('You received some data!', data);

  for (const each of chkArray){
    if(data.Top[each]){
      let usage=data.Top[each].numberUsage+1;
      console.log(usage);
      database.ref(`users/${user}/Clothes/Top/${each}` ).update({
         clean:true
    })
  }
    else{
      let usage=data.Bottom[each].numberUsage+1;
      console.log(usage);
      database.ref(`users/${user}/Clothes/Bottom/${each}` ).update({
         clean:true
    })

  }
}


})


  /* we join the array separated by the comma */
  var selected;
  selected = chkArray.join(',') ;

  /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
  if(selected.length > 0){
  }else{
    alert("Please at least check one of the checkbox");

  }


  }




});
