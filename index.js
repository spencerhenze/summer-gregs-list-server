var express = require('express')
var bodyParser = require('body-parser')
var expressSanitizer = require('express-sanitizer');
var server = express()
var port = 3000

// MIDDLEWARE
server.use(express.static(__dirname + '/public'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(expressSanitizer());

var housesRouter = require('./routes/houses');
var jobsRouter = require('./routes/jobs');

server.use('/api/houses', housesRouter);
server.use('/api/jobs', jobsRouter);

server.listen(port, () => {

	console.log(`
    Starting up node,
    Available on:
    http://127.0.0.1:${port}
    Hit CTRL-C to stop the server`)

})