var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var autoSchema = new mongoose.Schema({
	make: { type: String, required: true },
	model: { type: Number, required: true },
	price: { type: Number, required: true },
	img: { type: String }
})

var Autos = mongoose.model('auto', autoSchema)

router.get('/', function (req, res, next) {
	Autos.find({})
		.then((autos) => {
			res.send(autos)
		})
		.catch(next)
})

router.post('/', function (req, res, next) {
	Autos.create(req.body) // PROMISE
		.then((auto) => {
			res.send(auto)
		})
		.catch(next)
})


router.use(wizbang);

function wizbang(err, req, res, next) {

	if (req.xhr) {
		res.json({ success: false, error: err });
	}
	else {
		res.json({ success: false, error: err.message });
	}
}

module.exports = router