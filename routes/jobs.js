var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

var jobSchema = new mongoose.Schema({
    company: { type: String, required },
    title: { type: String, required: true },
    description: { type: Number, required: true },
    pay: { type: Number, required: true },
})

var Jobs = mongoose.model('job', jobSchema)

router.get('/', function (req, res, next) {
    Jobs.find({})
        .then((jobs) => {
            res.send(jobs)
        })
        .catch(next)
})

router.get('/', function (req, res, next) {
    Jobs.create(req.body)
        .then((job) => {
            res.send(job)
        })
        .catch(next)
})

router.use(whizbang);

function wizbang(err, req, res, next) {

	if (req.xhr) {
		res.json({ success: false, error: err });
	}
	else {
		res.json({ success: false, error: err.message });
	}
}





module.exports = router