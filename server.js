const dotenv = require("dotenv"); 
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose"); 
const path = require('path');
const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev")); 

// Controllers
const businessesController = require("./controllers/businessController");
app.use("/businesses", businessesController);

// routes
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

router.post('/', async (req, res) => {
	if (req.body.isVerified === 'on') {
		req.body.isVerified = true;
	} else {
		req.body.isVerified = false;
	}
	await Business.create(req.body);
	res.redirect('/businesses');  
})

router.get('/:businessId/edit', async (req, res) => {
	const foundBusiness = await Business.findById(req.params.businessId);
	res.render('businesses/edit.ejs', { business: foundBusiness });
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});