$(document).ready(() =>{
  const database = firebase.database();
  const user = localStorage['loggedInUser'];
  console.log("hello");

  database.ref('users/').once('value', (snapshot) => {
    const data = snapshot.val();

    try {
      const topKey = Object.keys(data[user].Clothes.Top);

      if(topKey.length <= 0) {
        $('.error').html(localStorage['loggedInUser'], ' did not add any clothes into the closet!');
      } else {
        $('.error').html('');
        let number=1;
        for(const clothes of topKey) {
  
          $('.panel-group').append(` <div class="panel panel-default"> <div class="panel-heading"><p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${clothes}</p></div>
          <div class="round">
                  <input type="checkbox" id="checkbox" />
                  <label for="checkbox"></label>
                </div>
          <div id="collapse${number}" class="panel-collapse collapse in"> <div class="panel-body"> <img class="pic" width="120" src="/images/blueShirt.jpg"><p class="words">You have worn this shirt 3 times this month. </p></div></div></div>`);
          number=number+1;
  
        }
      }
    } catch(err) {
      console.log(err);
      $('.error').html(`${user} did not have any tops in the closet!`);
      return;
    }
  });
});
