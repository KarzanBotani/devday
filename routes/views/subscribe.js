let keystone = require('keystone');
let Subscribe = keystone.list('Subscribe');

exports = module.exports = function (req, res) {
	let view = new keystone.View(req, res);
	let locals = res.locals;

  // SET LOCALS
	locals.section = 'subscribe';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

  // ON 'POST' REQUESTS,
  // ADD SUBSCRIPTION ITEM TO THE DATABASE
	view.on('post', { action: 'subscribe' }, function (next) {

		let newSubscriber = new Subscribe.model();
		let updater = newSubscriber.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'email',
			errorMessage: 'There was a problem submitting your subscription: ',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.subscriptionSubmitted = true;
			}
			next();
		});
	});

	view.render('subscribe');
};
