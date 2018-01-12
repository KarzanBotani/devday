let keystone = require('keystone');
let Types = keystone.Field.Types;

let Project = new keystone.List('Project', {
	map: { name: 'title' },
	singular: 'Project',
	plural: 'Projects',
	autokey: { path: 'slug', from: 'title', unique: true },
});

Project.add({
	title: { type: String, required: true, label: 'Titel' },
	state: {
		type: Types.Select,
		options: [
			{ value: 'draft', label: 'Utkast' },
			{ value: 'published', label: 'Publicerad' },
			{ value: 'archived', label: 'Arkiverad' },
		],
		default: 'draft',
		index: true,
		label: 'Tillstånd',
	},
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: {
			state: 'published',
		},
		label: 'Publicerat datum',
	},
	image: { type: Types.CloudinaryImage, label: 'Bild' },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150, label: 'Kort beskrivning' },
		extended: { type: Types.Html, wysiwyg: true, height: 300, label: 'Projektbeskrivning' },
	},
	categories: { type: Types.Relationship, ref: 'ProjectCategory', many: true, label: 'Kategori(er)' },
});

Project.defaultColumns = 'title, state|20%, categories|20%, publishedDate|20%';

Project.register();
