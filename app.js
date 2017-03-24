const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next) =>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n');
	next();
});

// app.use((req,res,next) =>{
// 	res.render('maintenance');
// });

hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) =>{
	return text.toUpperCase();
});

app.get('/',(req,res) =>{
	res.render('home',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website',
	});
});

app.get('/about',(req,res) =>{
	res.render('about',{
		pageTitle:'About Page'
	});
});

app.get('/bad',(req,res) =>{
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(process.env.PORT,process.env.IP, () =>{
	console.log('Server Started');
});