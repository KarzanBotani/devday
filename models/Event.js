let keystone = require('keystone');
let Types = keystone.Field.Types;

let Event = new keystone.List('Event', {
	map: { name: 'date' },
	autokey: { path: 'slug', from: 'date', unique: true },
});

Event.add({
	date: { type: Types.Date, label: 'Datum', required: true },
});

Event.defaultColumns = 'date';
Event.register();
