$(document).ready(() => {
    console.log("Ready to sign up!");
    const database = firebase.database();
    const uname = $('#usernameinput').val();
    const pwd = $('#passwordinput').val();
    const email = $('#emailinput').val();
    const loc = $('#locationinput').val();

    $('#signup').click(() => {
      // Insert data into firebase
      if($('#usernameinput').val() != '') {
        database.ref(`users/${$('#usernameinput').val()}`).set({
          password: $('#passwordinput').val(),
          email: $('#emailinput').val(),
          location: $('#locationinput').val()
        });
      window.location.href = '/';
      }
    });
  });