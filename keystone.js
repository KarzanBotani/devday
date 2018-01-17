require('dotenv').config();

let keystone = require('keystone');
let pkg = require('./package.json');

keystone.init({
	'name': 'Utvecklardag',
	'brand': 'Utvecklardag',

	'cloudinary secure': true,

	'favicon': 'public/favicon.ico',
	'less': 'public',
	'static': 'public',

	'views': 'templates/views',
	'view engine': 'pug',

	'emails': 'templates/emails',

	'mailgun api key': process.env.MAILGUN_API_KEY,
	'mailgun domain': process.env.MAILGUN_DOMAIN,

	// 'mongo': process.env.MONGO_URI || 'mongodb://localhost/' + pkg.name,
	'port': process.env.PORT || 3000,

	'auth': true,
	'auto update': true,
	'cookie secret': process.env.COOKIE_SECRET || 'utvecklardag',
	'session': true,
	'session store': 'mongo',
	'user model': 'User',

	'wysiwyg override toolbar': false,
	'wysiwyg additional plugins': 'codesample',
	'wysiwyg additional buttons': 'codesample',
});

keystone.import('models');

keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
	posts: ['posts', 'post-categories'],
	projects: ['projects', 'project-categories'],
	enquiries: 'enquiries',
	users: 'users',
});

keystone.set('cloudinary prefix', 'devday');

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}

keystone.start();
