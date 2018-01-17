let keystone = require('keystone');
let Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	let view = new keystone.View(req, res);
	let locals = res.locals;

	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.error = false;
	locals.enquirySubmitted = false;

	view.on('post', { action: 'contact' }, function (next) {

		let newEnquiry = new Enquiry.model();
		let updater = newEnquiry.getUpdateHandler(req);

		updater.process(req.body, {
			fields: 'name, email, enquiryType',
		}, function (err) {
			if (err) {
				locals.error = true;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('contact');
};
