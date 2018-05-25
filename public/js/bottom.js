$(document).ready(() =>{
  const database = firebase.database();
  console.log("hello");

  database.ref('users/').once('value', (snapshot) => {
    const data = snapshot.val();

    const bottomKey = Object.keys(data['Bob'].Clothes.Bottom);

    let number=1;
    for(const clothes of bottomKey) {


      $('.panel-group').append(` <div class="panel panel-default"> <div class="panel-heading">
      <p class="title" data-toggle="collapse" data-parent="#accordion" href="#collapse${number}"> ${clothes}</p></div>
      <div class="round">
    					<input type="checkbox" id="checkbox" />
    					<label for="checkbox"></label>
  					</div>
      <div id="collapse${number}" class="panel-collapse collapse in"> <div class="panel-body">
      <img class="pic" width="120" src="/images/lightBlueJeans.jpeg">
      <p class="words">You have worn this shirt 3 times this month. </p></div></div></div>`);
      number=number+1;

    }




});
});
