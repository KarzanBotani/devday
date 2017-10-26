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
	projectOwner: { type: Types.Relationship, ref: 'User', index: true, many: true, label: 'Projekt ägare' },
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
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
		label: 'Publicerad',
	},
	image: { type: Types.CloudinaryImage, label: 'Bild' },
	purpose: { type: Types.Html, wysiwyg: true, height: 200, label: 'Syfte' },
	goal: { type: Types.Html, wysiwyg: true, height: 200, label: 'Mål' },
	currentMaterial: { type: Types.Html, wysiwyg: true, height: 150, label: 'Nuvarande material' },
	individualROI: { type: Types.Html, wysiwyg: true, height: 150, label: 'Individuell ROI' },
	oddHillROI: { type: Types.Html, wysiwyg: true, height: 150, label: 'Odd Hill ROI' },
	technicalChoice: { type: Types.Html, wysiwyg: true, height: 150, label: 'Tekniskt val' },
	participants: { type: Types.Relationship, ref: 'User', index: true, many: true, label: 'Deltagare' },
	neededResources: { type: Types.Html, wysiwyg: true, height: 150, label: 'Behövd material' },
	timePlan: { type: Types.Html, wysiwyg: true, height: 100, label: 'Tidsplan' },
	finishedWhen: { type: Types.Html, wysiwyg: true, height: 100, label: 'Färdigt när' },
	contactPerson: { type: Types.Relationship, ref: 'User', index: true, many: true, label: 'Kontaktperson' },
	categories: { type: Types.Relationship, ref: 'ProjectCategory', many: true, label: 'Kategori(er)' },
});

Project.defaultColumns = 'title, state|20%, projectOwner|20%, categories|20%, publishedDate|20%';

Project.register();
