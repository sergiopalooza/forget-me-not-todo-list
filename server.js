// setting up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-Override');

//config

mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu'); //connecting to our mongo database

app.use(express.static(__dirname + '/public')); 		//serves static files from the root folder
app.use(morgan('dev')); 								//set up logging for each request to console
app.use(bodyParser.urlencoded({'extended':'true'}));	//parse application/x-www-form-urlencoded
app.use(bodyParser.json());								//parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); //parse application/vnd.api+json as json
app.use(methodOverride());

//defining our model
var Todo = mongoose.model('Todo', {
	text: String
});

//routes (move me to my own file later)
	//get all todos
	app.get('/api/todos', function(req, res){

		Todo.find(function(err, todos){

			//send error if cant get todos
			if(err){
				res.send(err);
			}
			else {
				res.json(todos); //return all todos in JSON
			}
		});
	});

	//create todo and fetch all the todos after creation
	app.post('/api/todos', function(req, res){

		//create todo, info coming from AJAX request from Angular
		Todo.create({
			text: req.body.text,
			done: false,
		}, function(err, todo){
			if(err){
				res.send(err);
			}
			
			//get and find all todos when you create another one
			Todo.find(function(err, todos){
				if(err){
					res.send(err)
				}
				res.json(todo);
			});
		});
	});

	//delete a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		Todo.remove({
			_id: req.params.todo_id
		}, function(err, todos){
			if(err){
				res.send(err);
			}

			//get and return all todos after deletion
			Todo.find(function(err, todos){
				if(err){
					res.send(err);
				}
				res.json(todos);
			});
		});
	});

//start node.js app on port 8080
app.listen(8080);
console.log('Listening on port 8080');
