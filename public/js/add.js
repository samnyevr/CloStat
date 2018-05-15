$(document).ready(() => {
    $('#addButton').click(() => {
        const database = firebase.database();
        database.ref(`users/`).once('value', (snapshot) => {
            const data = snapshot.val();
        });
    });
});
