/**
 * Module dependencies.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const handlebars = require('express3-handlebars')

const index = require('./routes/index');
const closet = require('./routes/closet');
const stat = require('./routes/stat');
const suggestion = require('./routes/suggestion');
const top = require('./routes/top');
const bottom = require('./routes/bottom');
const washing = require('./routes/washing');
const add = require('./routes/add');
const test = require('./routes/test');

// Example route
// var user = require('./routes/user');

const app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static('public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

const data = require('./data.json')

app.get('/items', (req, res) => {
  const allItems = Object.keys(data); // returns a list of object keys
  console.log('allItems is:', allItems);
  res.send(allItems);
});





app.get('/', index.view);
app.get('/closet', closet.view);
app.get('/stat', stat.view);
app.get('/suggestion', suggestion.view);
app.get('/top', top.view);
app.get('/bottom', bottom.view);
app.get('/washing', washing.view);
app.get('/add', add.view);
app.get('/test', test.view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
