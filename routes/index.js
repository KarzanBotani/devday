let keystone = require('keystone');
let middleware = require('./middleware');
let importRoutes = keystone.importer(__dirname);

// common middleware
// keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// handle 404 errors
// keystone.set('404', function (req, res, next) {
// 	res.notfound();
// });

// // handle other errors
// keystone.set('500', function (err, req, res, next) {
// 	let title, message;
// 	if (err instanceof Error) {
// 		message = err.message;
// 		err = err.stack;
// 	}
// 	res.err(err, title, message);
// });

// import route controllers
let routes = {
	views: importRoutes('./views'),
};

// setup route bindings
exports = module.exports = function (app) {
	// views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/projects/:category?', routes.views.projects);
	app.get('/projects/project/:project', routes.views.project);
	app.all('/contact', routes.views.contact);
};
