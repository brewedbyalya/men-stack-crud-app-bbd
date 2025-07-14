const express = require("express");
const router = express.Router();
const Business = require("../models/business.js"); 

router.get('/', async (req, res) => {
  const allBusinesses = await Business.find();
  console.log(allBusinesses);
  res.render('businesses/index.ejs', { businesses: allBusinesses });
});

router.get("/new", (req, res) => {
  res.render("businesses/new.ejs");
});

// new
router.post('/', async (req, res) => {
  console.log(req.body);
  if (req.body.isVerified === 'on') {
    req.body.isVerified = true;
  } else {
    req.body.isVerified = false;
  }
  await Business.create(req.body);
  res.redirect('/businesses/new'); 
});


// show
router.get('/:businessId', async (req, res) => {
  const foundBusiness = await Business.findById(req.params.businessId);
  res.render('businesses/show.ejs', { business: foundBusiness });
});

// delete
router.delete('/:businessId', async (req, res) => {
  await Business.findByIdAndDelete(req.params.businessId);
  res.redirect('/businesses');
});

// edit
router.get('/:id/edit', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    res.render('businesses/edit.ejs', { business });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    req.body.isVerified = req.body.isVerified === 'on';
    await Business.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/businesses/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;