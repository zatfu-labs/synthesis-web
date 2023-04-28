const { visits } = require('./model/index');

const siteViewsUp = function () {
	visits
		.findByIdAndUpdate('62e1556682dc251b0d97ad7c', { $inc: { counter: 1 } }, { new: true })
		.then((data) => {
			console.log(data.counter);
		})
		.catch((err) => {
			console.log(err);
		});
};

module.exports = siteViewsUp;
