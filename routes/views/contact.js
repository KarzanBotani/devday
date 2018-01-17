let keystone = require('keystone');
let Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {

		let newEnquiry = new Enquiry.model();
		let updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			fields: 'name, email, enquiryType',
		}, function (err) {
			if (err) {
				req.flash('warning', 'Du har glömt att fylla i obligatoriska fält!');
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('contact');
};
