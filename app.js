/**
 * Module dependencies.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const handlebars = require('express3-handlebars')

const login = require('./routes/login');
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



const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('closet.db');

app.get('/tops', (req, res) => {
  db.all('SELECT * FROM items WHERE type = "top"', (err,rows) => {
  	const allTops = rows;
  	res.send(allTops);
  });
 
});

app.get('/bottoms', (req, res) => {
  db.all('SELECT * FROM items WHERE type = "bottom"', (err,rows) => {
  	const allBottoms = rows;
  	res.send(allBottoms);
  });
});

app.get('/accessories', (req, res) => {
  db.all('SELECT * FROM items WHERE type = "accessory" ', (err,rows) => {
  	const allAccessories = rows;
  	res.send(allAccessories);
  });
});

app.get('/items', (req, res) => {

	  db.all('SELECT * FROM items', (err,rows) => {
	  	const allItems = rows;
	  	res.send(allItems);
	  });

});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); // hook up with your app
app.post('/tops', (req, res) => {
  console.log(req.body);

  db.run(
    'INSERT INTO items VALUES  ($name,"top", $numberUsage, $status)',
    // parameters to SQL query:
    {
      $name: req.body.name,
      $numberUsage: req.body.numberUsage,
      $status: req.body.status,
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        res.send({message: 'error in app.post(/users)'});
      } else {
        res.send({message: 'successfully run app.post(/users)'});
      }
    }
  );
});




app.get('/', login.view);
app.get('/index', index.view);
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
