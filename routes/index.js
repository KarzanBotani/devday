let keystone = require('keystone');
let middleware = require('./middleware');
let importRoutes = keystone.importer(__dirname);

// COMMON MIDDLEWARE
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', function (req, res, next) {
	res.notfound();
});

// Handle other errors
keystone.set('500', function (err, req, res, next) {
	let title, message;
	if (err instanceof Error) {
		message = err.message;
		err = err.stack;
	}
	res.err(err, title, message);
});

// IMPORT ROUTE CONTROLLERS
let routes = {
	views: importRoutes('./views'),
};

// SETUP ROUTE BINDINGS
exports = module.exports = function (app) {
	// VIEWS
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/projects/:category?', routes.views.projects);
	app.get('/projects/project/:project', routes.views.project);
	app.all('/contact', routes.views.contact);
};
