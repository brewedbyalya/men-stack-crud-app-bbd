const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema(
	{
		name: String,
		category: String,
		description: String,
		location: String,
		phoneNumber: String,
		website: String,
		isVerfified: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;

router.get('/', async (req, res) => {
    const allBusinesses = await Business.find();
    console.log(allBusinesses);
    res.render('businesses/index.ejs', { businesses: allBusinesses });
})