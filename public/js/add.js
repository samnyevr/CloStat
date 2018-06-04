/*
 * add.js allow the user to upload information and pictures of the clothing
 * into the firebase database. A preview of the image will be shown before the
 * user actually uploads into the database.
 */

$(document).ready(() => {
    const database = firebase.database();
    const storageRef = firebase.storage().ref();

    const user = localStorage['loggedInUser'];
    let name = '';
    let dbPath;

    // Get the values from the HTML input boxes, then upload the information
    // into the database.
    $('#addButton').click(() => {
        database.ref(`users/`).once('value', (snapshot) => {
            const data = snapshot.val();
            const type = $('#type').val();
            console.log(type);
            dbPath = `users/${user}/Clothes/${type}/`;
            if(!name){
              name='No Name';
            }

            name = $('#name').val();
            dbPath += name;

            console.log(name);
            console.log(type);
            console.log(dbPath);

            if(name != 'No Name' && name != ' ') {
                // Ensure no overwriting previous data on accident
                database.ref(dbPath).update({
                    clean: true,
                    numberUsage: 0,
                    name: name,
                    temp: $('#temperature').val(),
                });
            }

        });

        // Get the image from the HTML and upload the file into the firebase
        // storage. The url of the image is stored as a string into the database.
        const image = document.getElementById('cloth').files[0];
        const picName = (+new Date()) + '-' + name;
        const metadata = { contentType: image.type }
        storageRef.child(picName).put(image, metadata).then((snapshot) => {
            return snapshot.downloadURL;
        }).then((url) => {
            console.log('the url is ', url);
            console.log('the path is ', dbPath);
            database.ref(dbPath).update({
                photo: url
            });
        }).then(() => {
            window.location.href = "/closet";
        });
    });

    // Detect change in the img HTML element
    $('#cloth').change(() => {
        const imgInput = document.getElementById('cloth');
        // The user uploaded files
        if(imgInput.files && imgInput.files[0]) {
            console.log('success!');
            const prev = document.getElementById('preview');
            // Show a preview of the uploaded picture
            prev.src = URL.createObjectURL(imgInput.files[0]);
            prev.setAttribute('width', '250px');
            prev.setAttribute('height', '250px');
        }
    });
});
