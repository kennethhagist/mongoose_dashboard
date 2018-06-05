const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const connection = mongoose.connect("mongodb://localhost/dog_db");

const DogSchema = new mongoose.Schema({
    name: String,
    weigth: Number,
    color: String
});

const Dog = mongoose.model('Dog', DogSchema);

app.get('/', function(request, response) {
    Dog.find({}, function(err, results) {
        if (err) { console.log(err); }
        response.render('index', { dogs: results });
    });
});

app.post('/dog', function(request, response) {
    Dog.create(request.body, function(err, result) {
        if (err) { console.log(err); }
        response.redirect('/')
    });
});

app.get('/dog/new', function(request, response) {
    response.render('new');
});

app.get('/dog/:id', function(request, response) {
    Dog.find({ _id: request.params.id }, function(err, response) {
        if (err) { console.log(err); }
        response.render('show', { dog: response[0] });
    });
});

app.get('/dog/edit/:id/', function(request, response) {
    Dog.find({ _id: request.params.id }, function(err, response) {
        if (err) { console.log(err); }
        response.render('edit', { dog: response[0] });
    });
});

app.post('/dog/:id', function(request, response) {
    Dog.update({ _id: request.params.id }, request.body, function(err, result) {
        if (err) { console.log(err); }
        response.redirect('/');
    });
});

app.post('/dog/destory/:id', function(request, response) {
    Dog.remove({ _id: request.params.id }, function(err, result) {
        if (err) { console.log(err); }
        response.redirect('/');
    });
});

app.listen(3000, function() {
    console.log("Running on port 3000");
});