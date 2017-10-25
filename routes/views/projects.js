let keystone = require('keystone');
let async = require('async');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	locals.section = 'project';
	locals.filters = {
		category: req.params.category,
		user: req.params.user,
	};
	locals.data = {
		projects: [],
		categories: [],
		users: [],
	};

  // LOAD USERS
	view.on('init', function (next) {
		keystone.list('User').model
							.find()
							.sort('name')
							.exec(function (err, results) {

								if (err || !results.length) {
									return next(err);
								}

								locals.data.users = results;

			// LOAD COUNTS FOR EACH USER
								async.each(locals.data.users, function (user, next) {

									keystone.list('Project')
						.model
						.count()
						.where('projectOwner participants contactPerson')
						.in([user.id])
						.exec(function (err, count) {
							user.projectOwnerCount = count;
							next(err);
						});
								}, function (err) {
									next(err);
								});
							});
	});

	// LOAD CATEGORIES
	view.on('init', function (next) {
		keystone.list('ProjectCategory').model
										.find()
										.sort('name')
										.exec(function (err, results) {

											if (err || !results.length) {
												return next(err);
											}

											locals.data.categories = results;

											// LOAD COUNTS FOR EACH CATEGORY
											async.each(locals.data.categories, function (category, next) {

												keystone.list('Project')
						.model
						.count()
						.where('categories')
						.in([category.id])
						.exec(function (err, count) {
							category.projectCount = count;
							next(err);
						});

											}, function (err) {
												next(err);
											});
										});
	});

	/* LOAD USER FILTER */
	view.on('init', function (next) {

		if (req.params.user) {
			keystone.list('User')
					.model
					.findOne({ key: locals.filters.user })
					.exec(function (err, result) {
						locals.data.user = result;
						next(err);
					});
		} else {
			next();
		}
	});

	/* LOAD CURRENT CATEGORY FILTER */
	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('ProjectCategory')
					.model
					.findOne({ key: locals.filters.category })
					.exec(function (err, result) {
						locals.data.category = result;
						next(err);
					});
		} else {
			next();
		}
	});

	/* PAGINATION */
	view.on('init', function (next) {

		var q = keystone.list('Project').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate')
			.populate('author categories projectOwner');

		if (locals.data.user) {
			q.where('projectOwner').in([locals.data.user]);
		}

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			locals.data.projects = results;
			next(err);
		});
	});

	view.render('projects');
};
