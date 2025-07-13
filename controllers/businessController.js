const express = require("express");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("businesses/new.ejs");
});

router.post('/', (req, res) => {
    console.log(req.body)
    res.redirect('/businesses/new')
});

router.post('/', async (req, res) => {
    if (req.body.isVerified === 'on') {
        req.body.isVerified = true;
    } else {
        req.body.isVerified = false;
    }
    await Business.create(req.body);
    res.redirect('/businesses/new');
});

router.get('/:businessId', async (req, res) => {
	const foundBusiness = await Business.findById(req.params.businessId);
	res.render('businesses/show.ejs', { business: foundBusiness });
});

router.delete('/:businessId', async (req, res) => {
	await Business.findByIdAndDelete(req.params.businessId);
	res.redirect('/businesses');
});

router.put('/:businessId', async (req, res) => {
	if (req.body.isVerified === 'on') {
		req.body.isVerified = true
	} else {
		req.body.isVerified = false
	}
	await Business.findByIdAndUpdate(req.params.businessId, req.body)
	res.redirect(`/businesses/${req.params.businessId}`)
})

const Business = require("../models/business.js");
module.exports = router;