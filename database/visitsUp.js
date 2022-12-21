const siteViews = require('./model/visits');

const siteViewsUp = function () {
	siteViews
		.findByIdAndUpdate(
			'62e1556682dc251b0d97ad7e',
			{$inc: {counter: 1}},
			{new: true},
		)
		.then(data => {
			console.log(data.counter);
		})
		.catch(err => {
			console.log(err);
		});
};

module.exports = siteViewsUp;
