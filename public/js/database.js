// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyA9qeDEWivwl8pN0OjpKABOS8bOZZHZiOw",
//     authDomain: "clothstat.firebaseapp.com",
//     databaseURL: "https://clothstat.firebaseio.com",
//     projectId: "clothstat",
//     storageBucket: "clothstat.appspot.com",
//     messagingSenderId: "692402704354"
// };
// firebase.initializeApp(config);

// $(document).ready(() => {
//     const database = firebase.database();
    
//     database.ref('users/').once('value', (snapshot) => {
//         const data = snapshot.val();
//         const keys = Object.keys(data);

//         for(const key of keys) {
//             console.log('keys: ', key);
//         }
//     });
// });
const database = firebase.database();

function getUserInfo() {
    let res = database.ref(`users/`).once('value', (snapshot) => {
        // console.log('snap vals: ', snapshot.val());
        // res = snapshot.val();
        // console.log(res);
        return snapshot.val();
    });
    return res;
}

function getClothes(type) {
    database.ref(`users/Bob`).once('value', (snapshot) => {
        return snapshot.val().Clothes.type;
    });
}

function getClothesInfo(type, cloth, clothInfo) {
    database.ref(`users/Bob`).once('value', (snapshot) => {
        return snapshot.val().Clothes.type.cloth.clothInfo;
    });
}

$(document).ready(() => {
    console.log('func output: ', getUserInfo());
});