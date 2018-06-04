$(document).ready(() =>{
  const database = firebase.database();
  const user = localStorage['loggedInUser'];
  console.log("hello");

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



  database.ref('users/').on('value', (snapshot) => {
    console.log("first once");
    const data = snapshot.val();
    const user = localStorage['loggedInUser'];

    try {
      const top = data[user].Clothes.Top;
      const topKey = Object.keys(data[user].Clothes.Top);
      var cleanArray = [];
      for(const key of topKey) {
        if (top[key].clean && top[key].temp == tempName) {
          cleanArray.push(key);
        }
      }
      console.log(cleanArray);

    let number=1;
    $('#accordion').html('');
    for(const clothes of cleanArray) {
      let imgUrl= top[clothes].photo;

      let usageNumber=data[user].Clothes.Top[`${clothes}`].numberUsage
      $('#accordion').append(` <div class="panel panel-default"> <div class="panel-heading">
      <p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${clothes}</p>

          </div>
          <div class="round">

          <input type="checkbox" id="checkbox${number}" value="${clothes}" />
          <label for="checkbox${number}"> </label>
          </div>

          <div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
          <img src="${imgUrl}" class="pic" width="120" src="/images/blueShirt.jpg">
          <p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
        number=number+1;

      }


      $('#accordionOther').html('');
      for(const clothes of topKey) {
        if (top[clothes].clean) {

          if(!cleanArray.includes(clothes)){


        let imgUrl= top[clothes].photo;

        let usageNumber=data[user].Clothes.Top[`${clothes}`].numberUsage
        $('#accordionOther').append(` <div class="panel panel-default"> <div class="panel-heading">
        <p class="title" data-toggle="collapse" data-parent="#accordionOther" href="#collapse${number}"> ${clothes}</p>

            </div>
            <div class="round">

            <input type="checkbox" id="checkbox${number}" value="${clothes}" />
            <label for="checkbox${number}"> </label>
            </div>

            <div id="collapse${number}" class="panel-collapse collapse"> <div class="panel-body">
            <img src="${imgUrl}" class="pic" width="120" src="/images/blueShirt.jpg">
            <p class="words">You have worn this shirt ${usageNumber} times this month. </p></div></div></div>`);
          number=number+1;

        }
      }
    }
    } catch(err) {
      window.alert(`${user} did not have any tops in the closet!`);
      console.log(err);
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
    database.ref(`users/${user}/Clothes/Top`).once('value', (snapshot) => {
      const data = snapshot.val();
      console.log('You received some data!', data);
      const time = new Date();
      const date = `${time.getFullYear()}, ${time.getMonth()+1}, ${time.getDate()}, ${time.getMinutes()}`;
      console.log(date);

      for (const each of chkArray){
        let usage=data[each].numberUsage+1;
        console.log(usage);
         database.ref(`users/${user}/Clothes/Top/${each}` ).update({
          numberUsage: usage,
          clean:false
        });

       //database.ref(`users/${user}/Clothes/Top/${each}/usageDates`).update({

       //});
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


  }




});
