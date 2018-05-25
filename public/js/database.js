/*
 * Filename: database.js
 * Description: A list of functions that allow users to access specific
 * information from firebase.
 * Note: in order to get the desired values, need to call the function like
 * the following: func().then(key => { // Do something }), where key is the values
 * the user wants. If user did not call then and access the key, they will
 * only have the value of the promise.
 */

const database = firebase.database();

/*
 * Function Name: getUserInfo()
 * Description: Get the user's information (password, email, clothes object, 
 * and location).
 * Parameters: None
 * Error: User have no info (no check implemented yet)
 * return value: key-value pairs for password, email, clothes object, and location.
 */
function getUserInfo() {
    return database.ref(`users/Bob`).once('value').then((snapshot) => {
            return snapshot.val();
    });/*.then( (key) => {
        return key;
    });*/
}

/*
 * Function Name: getClothes()
 * Description: Get the clothes objects depending on which type user
 * wants
 * Parameters: type - the type of clothes (top, bottom, accessories)
 * Side Effects: None
 * Error: invalid input (no check implemented yet)
 * return value: list of clothing items the user requested
 */
function getClothes(type) {
    return database.ref(`users/Bob`).once('value').then((snapshot) => {
        return snapshot.val().Clothes.type;
    });
}

/*
 * Function Name: getClothesInfo()
 * Description: Get the information of the specific cloth
 * Parameters: type - the type of clothes (top, bottom, accessories)
 *             cloth - the name of the cloth item
 *             attribute - the attribute of the clothing item (clean: bool, 
 *             numberUsage: int, temp: string)
 * Side Effects: None
 * Error: Invalid no input (no check implemented yet)
 * return value: the value of the clothing attribute
 */
function getClothesInfo(type, cloth, attribute) {
    return database.ref(`users/Bob`).once('value').then((snapshot) => {
        return snapshot.val().Clothes.type.cloth.attribute;
    });
}

$(document).ready(() => {
    // const val = getUserInfo().then( (key) => {
    //     console.log(key);
    // });
    console.log(getUserInfo());
});