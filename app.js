/**
 * Module dependencies.
 */

 const express = require('express');
 const http = require('http');
 const path = require('path');
 const handlebars = require('express3-handlebars')

 const login = require('./routes/login');
 const signup = require('./routes/signup');
 const index = require('./routes/index');
 const closet = require('./routes/closet');
 const stat = require('./routes/stat');
 const suggestion = require('./routes/suggestion');
 const top = require('./routes/top');
 const bottom = require('./routes/bottom');
 const washing = require('./routes/washing');
 const add = require('./routes/add');

 let temp;

 let suggestionTop = Array();
 let maxTop;
 let suggestionBottom = Array();
 let maxBottom;


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

app.get('/', login.view);
app.get('/signup', signup.view);
app.get('/index', index.view);
app.get('/closet', closet.view);
app.get('/stat', stat.view);
app.get('/top',top.view);
app.get('/bottom', bottom.view);
app.get('/washing', washing.view);
app.get('/add', add.view);

app.get('/suggestion',(req,res)=>{
	const randomImgTop = randomImg(suggestionTop,maxTop);
	const randomImgBottom = randomImg(suggestionBottom,maxBottom);

	res.send({
		top: randomImgTop,
		bottom: randomImgBottom
	});
});

function randomImg(array,max){

	if(max > 0){
		const index = Math.floor(Math.random() * (max));
		console.log(array[index].photo);
		return(array[index].photo); 
	}
	
}
app.get('/top',top.view);
app.get('/bottom', bottom.view);
app.get('/washing', washing.view);
app.get('/add', add.view);

app.get('/getTemp', (req,res)=>{
	res.send({temperature: temp});
})


app.post('/suggestion',(req,res)=>{
	suggestionTop = req.body.top;
	suggestionBottom = req.body.bottom;
	maxTop = req.body.maxTop;
	maxBottom = req.body.maxBottom;
	temp = req.body.temp;
	console.log(suggestionTop);
	console.log(suggestionBottom);
	res.send("registered on backend");
})
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
