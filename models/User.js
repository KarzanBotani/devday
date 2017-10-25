let keystone = require('keystone');
let Types = keystone.Field.Types;

let User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// PROVIDE ACCESS TO KEYSTONE
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/* RELATIONSHIPS */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

User.relationship({ ref: 'Project', path: 'projects', refPath: 'projectOwner' });
User.relationship({ ref: 'Project', path: 'projects', refPath: 'participants' });
User.relationship({ ref: 'Project', path: 'projects', refPath: 'contactPerson' });


/* REGISTRATION */
User.defaultColumns = 'name, email, isAdmin';
User.register();
