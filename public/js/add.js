$(document).ready(() => {
    const database = firebase.database();
    const storageRef = firebase.storage().ref();

    const user = localStorage['loggedInUser'];
    let name = '';
    let dbPath;

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
