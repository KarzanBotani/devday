let keystone = require('keystone');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	locals.section = 'home';

	view.render('index');
};
