let keystone = require('keystone');
let Types = keystone.Field.Types;

let Subscribe = new keystone.List('Subscribe');

Subscribe.add({
	email: { type: Types.Email, initial: false, required: true, unique: true, label: 'E-post: ' },
	subscribedAt: { type: Date, default: Date.now, label: 'Prenumererade: ' },
});

// Subscribe.schema.pre('save', function (next) {
// 	this.wasNew = this.isNew;
// 	next();
// });

// Subscribe.schema.post('save', function () {
// 	if (this.wasNew) {
// 		this.sendSubscriptionEmail();
// 	}
// });

/* EMAIL NOTIFICATION WHEN VISITOR SUBSCRIBES */
// Subscribe.schema.methods.sendSubscriptionEmail = function (callback) {
// 	if (typeof callback !== 'function') {
// 		callback = function (err) {
// 			if (err) {
// 				console.error('There was an error sending a SUBSCRIPTION email: ', err);
// 			}
// 		};
// 	}

// 	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
// 		console.log('Unable to send email - no mailgun credentials provided');
// 		return callback(new Error('could not find mailgun credentials'));
// 	}

// 	let subscribe = this;
// 	let brand = keystone.get('brand');

// 	keystone.list('Enquiry').model.find().exec(function (err) {

// 		if (err) {
// 			return callback(err);
// 		} else {

//       /* TO SUBSCRIBER */
// 			new keystone.Email({
// 				templateName: 'subscribe-notification-to-submitter',
// 				transport: 'mailgun',
// 			}).send({
// 				to: subscribe,
// 				from: {
// 					name: 'devday',
// 					email: 'contact@devday.com',
// 				},
// 				subject: 'Welcome, Subscriber!',
// 				brand: brand,
// 			}, callback);
// 		}
// 	});

// };

Subscribe.defaultSort = '-subscribedAt';
Subscribe.defaultColumns = 'email, subscribedAt';
Subscribe.register();
