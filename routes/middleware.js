let _ = require('lodash');

exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Hem', key: 'home', href: '/' },
		{ label: 'Blogg', key: 'blog', href: '/blog' },
		{ label: 'Projekt', key: 'projects', href: '/projects' },
		{ label: 'Kontakt', key: 'contact', href: '/contact' },
	];
	res.locals.user = req.user;
	next();
};

exports.flashMessages = function (req, res, next) {
	let flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};

exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
