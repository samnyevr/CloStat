$('#Login').click(function() {
    const username = document.getElementById('UsernameInput').value;
    const password = document.getElementById('PasswordInput').value;
    console.log(`Username: ${username} Password: ${password}`);
});

// db.run("CREATE TABLE users(id INT PRIMARY KEY, password TEXT,email TEXT, name TEXT, location TEXT)");

$('#SignUp').click(function() {
    var login = document.getElementById('SignUp');
    if(login.innerHTML == 'Sign Up') {
        login.innerHTML = 'Confirm';
        login.style.visibility = "hidden";
        // $('.signup').append('Username:<br><input type="text" id="UsernameInput"><br>Password<br><input type="text" id="PasswordInput"><br>Email<br><input type="text" id="EmailInput"<br>Location<br><input type="text" id="LocationInput"');
    } else {
        login.innerHTML = 'Sign Up';
        login.style.visibility = "visible";
        // $('.signup').innerHTML = '';
    }
});