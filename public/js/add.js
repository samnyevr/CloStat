$(document).ready(() => {
    $('#addButton').click(() => {
        const database = firebase.database();
        database.ref(`users/`).once('value', (snapshot) => {
            const data = snapshot.val();
            const name = $('#name').val();
            console.log(name);
            const type =$('#type').val();
            console.log(type);
            // console.log(`users/Bob/Clothes/${type}/${name}`);
            database.ref(`users/Bob/Clothes/${type}/${name}`).set({
              clean: true,
              numberUsage: 0,
              temp: $('#temperature').val(),
              // photo: $('#photo').val()
        });
    });
});
})
