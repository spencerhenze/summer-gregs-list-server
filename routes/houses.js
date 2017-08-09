var express = require('express')
var router = express.Router()

var houses = [
	{
		id: 1,
		description: 'A Sweet House',
		sqft: '1500',
		price: 105000,
		img: '//placehold.it/200x200'
	},
	{
		id: 2,
		description: 'Home sweet home',
		sqft: '1250',
		price: 120000,
		img: '//placehold.it/250X250'
	}
];

function House(description, sqft, price, img) {
	this.description = description
	this.sqft = sqft
	this.price = price
	this.img = img
}

function addHouse(description, sqft, price, img) {
	var house = new House(description, sqft, price, img)
	houses.push(house)
}


router.get('/', function (req, res) {
	res.json(houses)
})

router.post('/', function (req, res) {

	var data = req.body;

	data.description = req.sanitize(data.description);

	data.id = houses.length + 1;

	houses.push(data);

	res.json(houses);
})

// http://www.gregslist.com/api/house/1234
router.get('/:houseId', function (req, res, next) {

	// req.params.houseId = 1234
	let houseId = parseInt(req.params.houseId);

	if (houseId > 10) {
		var error = new Error('No, you fool!');
		return next(error);
	}

	// database lookup
	let index = houses.findIndex(item => {
		return item.id === houseId;
	});

	if (index > -1) {
		res.json(houses[index]);
	}
	else {
		res.json({});
	}

});

router.get('/search/:price/:footage?', function (req, res) {

	var maxPrice = parseInt(req.params.price);
	var minFootage = parseInt(req.params.footage || '0');

	var results = houses.filter(item => {
		return item.price <= maxPrice && item.sqft >= minFootage;
	});

	res.json(results);
});

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