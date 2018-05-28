$(document).ready(() => {
    const database = firebase.database();

    $('#login').click(() => {
      console.log('login!');
      
      database.ref('users/').once('value', (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        const uname = $('#usernameinput').val();
        const psd = $('#passwordinput').val();

        // Check to see if the user enter the right username and password
        if(keys.includes(uname)) {
            if(data[uname].password == psd) {
                localStorage['loggedInUser'] = uname;
                window.location.href = '/index';
            } else {
                $('#status').html('');
                $('#status').append('Wrong password!');
            }
        } else {
            $('#status').html('');
            $('#status').append('Wrong username!');
        }
      });

      //database.ref('users/').remove();
    });
  });