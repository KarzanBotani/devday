let keystone = require('keystone');
let Event = keystone.list('Event');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	locals.section = 'projects';
	locals.filters = {
		project: req.params.project,
	};
	locals.data = {
		projects: [],
	};

  // load current project
	view.on('init', function (next) {

		let q = keystone.list('Project').model.findOne({
			state: 'published',
			slug: locals.filters.project,
		}).populate('projectOwner participants contactPerson categories');

		q.exec(function (err, result) {
			locals.data.project = result;
			next(err);
		});
	});

  // load all projects
	view.on('init', function (next) {

		let q = keystone.list('Project').model.find().where('state', 'published').sort('-publishedDate').populate('projectOwner');

		q.exec(function (err, results) {
			locals.data.projects = results;
			next(err);
		});
	});

	view.render('project');
};
