var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

// WHAT IS A HOUSE?

// SCHEMA === CLASS

var houseSchema = new mongoose.Schema({
	description: { type: String, required: true },
	sqft: { type: Number, required: true },
	price: { type: Number, required: true },
	img: { type: String }
})

var Houses = mongoose.model('House', houseSchema)

router.get('/', function (req, res, next) {
	Houses.find({})
		.then((houses) => {
			res.send(houses)
		})
		.catch(next)
})

router.post('/', function (req, res, next) {
	Houses.create(req.body) // PROMISE
		.then((house) => {
			res.send(house)
		})
		.catch(next)
})

// http://www.gregslist.com/api/house/1234
router.get('/:houseId', function (req, res, next) {

	// req.params.houseId = 1234
	let houseId = req.params.houseId;


});

// router.get('/search/:price/:footage?', function (req, res) {

// 	var maxPrice = parseInt(req.params.price);
// 	var minFootage = parseInt(req.params.footage || '0');

// 	var results = houses.filter(item => {
// 		return item.price <= maxPrice && item.sqft >= minFootage;
// 	});

// 	res.json(results);
// });

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