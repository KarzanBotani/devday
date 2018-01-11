let keystone = require('keystone');
let Types = keystone.Field.Types;

let Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true,
});

Enquiry.add({
	name: { type: Types.Name, required: true, label: 'Namn: ' },
	email: { type: Types.Email, required: true, label: 'E-post: ' },
	phone: { type: String, label: 'Telefonnummer: ' },
	enquiryType: { type: Types.Select, options: [
		{ value: 'question', label: 'Jag har en fråga!' },
		{ value: 'attending', label: 'Jag vill anmäla mig till Utvecklardagen' },
		{ value: 'other', label: 'Övrigt' },
	] },
	message: { type: Types.Markdown, required: true, label: 'Meddelande: ' },
	createdAt: { type: Date, default: Date.now, label: 'Skapad: ' },
});

Enquiry.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Enquiry.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

/* E-MAIL NOTIFICATION WHEN AN ENQUIRY IS SUBMITTED */
Enquiry.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== 'function') {
		callback = function (err) {
			if (err) {
				console.error('There was an error sending the notification email to ADMIN:', err);
			}
		};
	}

	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log('Unable to send email - no mailgun credentials provided');
		return callback(new Error('could not find mailgun credentials'));
	}

	let enquiry = this;
	let brand = keystone.get('brand');

	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admin) {

		if (err) {
			return callback(err);
		} else {

			/* TO ADMIN */
			new keystone.Email({
				templateName: 'enquiry-notification',
				transport: 'mailgun',
			}).send({
				to: admin,
				from: {
					name: 'devday',
					email: 'contact@devday.com',
				},
				subject: 'New enquiry was submitted to devday!',
				enquiry: enquiry,
				brand: brand,
			}, callback);
		}
	});

};

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
