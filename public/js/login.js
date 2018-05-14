$(document).ready(() => {
    const database = firebase.database();

    $('#login').click(() => {
      console.log('login!');
      
      database.ref('users/').once('value', (snapshot) => {
        const data = snapshot.val();
        console.log('data: ',data);
      });

      //database.ref('users/').remove();
    });
  });