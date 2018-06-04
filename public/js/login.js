/*
 * login.js allow the user to login to their account and see their home page
 * with the corresponding clothing recommendations.
 */

$(document).ready(() => {
    const database = firebase.database();

    $('#login').click(() => {
      console.log('login!');
      
      // Retrieve the input field data and match it with the database data
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
                window.alert('Wrong password!');
            }
        } else {
            window.alert('Wrong username!');
        }
      });
    });
  });

// User can choose to hide or show the password in the input field.
function togglePassword() {
    const input = document.getElementById("passwordinput");
    if(input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}