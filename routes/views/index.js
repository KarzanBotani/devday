let keystone = require('keystone');
let Event = keystone.list('Event');
let moment = require('moment');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	locals.section = 'home';
	locals.data = {
		dates: [],
	};

	view.on('init', function (next) {
		let datesQuery = Event.model.find();

		datesQuery.exec(function (err, results) {

			for (let index in results) {
				let date = results[index].date;
				locals.data.dates.push(moment(date).locale('sv').format('LL'));
			}
			
			next(err);
		});

	});

	view.render('index');
};

// .map(d => new Date(d)).filter(d => d.getTime() - Date.now() > 0).sort((a, b) => a > b)[0] || 'error';

// funkar
// locals.data.dates.push(moment(date).locale('sv').format('D[:e] MMM'));
