$(document).ready(() => {
    console.log("Ready to sign up!");
    const database = firebase.database();

    $('#signup').click(() => {
      // Insert data into firebase
      database.ref(`users/${$('#usernameinput').val()}`).set({
        password: $('#passwordinput').val(),
        email: $('#emailinput').val(),
        location: $('#locationinput').val()
      });
    });
  });