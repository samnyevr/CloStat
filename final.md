# Final Project Deliverables


### Samuel Nye
* Data Visualization

### Ulric Ye
* Implemented the OpenWeatherMapAPI to extract weather information。
* Implemented the login and signup page.
* Implemented firebase database and storage to store user information and
picture of clothings.
### Lixiang Zhou
* top & bottom & laundry & closet & add pages, linking to the database
* updating the data by user's input in these pages
* UI styling
### Marcus Buzette
* Implemented Suggestion feature
* Backend logic/support


### login.handlebars
Creating the log in html page by reading the user input and let the users log in to their accounts.

### signup.handlebars
Creating the sign up html page by reading the user input and let the users sign up new accounts

### index.handlebars
Creating the index html page that shows the temperature, the recommended clothes for the day and
allow user to change the location. Users can see more suggestion by clicking the top and bottom pics.

### top.handlebars
This file creates the html layout of the top page which shows the recommended top and other clean tops you have in your closet.
And user can choose the top they want to wear for the day on this page.

### bottom.handlebars
This file creates the html layout of the bottom page which shows the recommended bottom and other clean bottoms you have in your closet.
And user can choose the top they want to wear for the day on this page.

### add.handlebars
This file creates the html layout of the add page that reading the input of new clothes users want to add.

### closet.handlebars
This file creates the html layout of the closet page which shows the all the clothes you have
and a pie chart that show the basic component of your closet.

### stat.handlebars
This file creates the the html layout for all the statistic graphs related to the closet data.

### washing.handlebars
This file creates the the html layout for the laundry page that shows all the dirty clothes and users can choose the clothes they want
to wash.

### app.js
Load the modules the app needs, then use GET requests to get the specified web pages. In addition, it will display a random image of one of the clothes in the list of clothes suggested by the app on the home page. It will also store the lists of suggestions to the backend of the app for the other files to retrieve the information later.

### style.css
General stlying sheet for our whole webpage

### signup.js
signup.js allow the user to signup and the information will be stored in firebase database

### login.js
login.js allow the user to log in and getting the information from the firebase

### index.js
The home page of the website. This page will navigate to other pages so most of the buttons are interacting with other pages.
Getting the weather and location data from the weather API, and get the recommended picture.

### bottom.js
bottom.js shows the user the suitable bottom clothes by getting the data from the database.There are two sections, one is the recommended clothes, the other section is for other clean clothes.This page also tracks what user wear for the day, user can choose from the suggestion and then the data in the database will mark the  clothes as dirty and increase the usage.

### top.js
 top.js shows the user the suitable top clothes by getting the data from the database.There are two sections, one is the recommended clothes, the other section is for other clean top. This page also tracks what user wear for the day, user can choose from the suggestion and then the data in the database will mark the clothes as dirty and increase the usage.

### closet.js
closet.js shows users' closet in a summary by getting data from the database. The data is separated by the clean or not, top or bottom by a drop down button There is a pie chart for summary that shows the basic statistic of your closet.

### washing.js
wahsing.js shows the user all the dirty clothes by getting the data from the database.So user can know what clothes he or she should do laundry on.This page also tracks what user do for laundry, user can choose from all the dirty clothes and then the data in the database will mark the clothes as clean.

### add.js
add.js allow the user to upload information and pictures of the clothing into the firebase database. A preview of the image will be shown before the user actually uploads into the database.

### stat.js
Stat.js used google charts api to create data visualization on this page

### weather.js
weather.js lets the user to allow the app to track user's location or manually enter the city, which the OpenWeatherMap API use to make a requests to get the latest weather information. After getting the weather information, the temperature is converted from Kelvin to Celsius, and the weather information is stored in local storage for other js files to use.  The corresponding weather information (temperature and weather condition) is then displayed on the web page.

### Video
<iframe width=420px src="https://youtu.be/DmPP0yGF7wg" frameborder="0" allowfullscreen></iframe>
