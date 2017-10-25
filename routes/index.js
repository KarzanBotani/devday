let keystone = require('keystone');
let middleware = require('./middleware');
let importRoutes = keystone.importer(__dirname);

// COMMON MIDDLEWARE
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

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

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
