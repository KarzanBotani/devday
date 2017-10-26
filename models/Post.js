let keystone = require('keystone');
let Types = keystone.Field.Types;

let Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
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
	author: { type: Types.Relationship, ref: 'User', index: true, label: 'Författare' },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' }, label: 'Publicerat datum' },
	image: { type: Types.CloudinaryImage, label: 'Bild' },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150, label: 'Ingress' },
		extended: { type: Types.Html, wysiwyg: true, height: 400, label: 'Brödtext' },
	},
	// code: { type: Types.Code, height: 300 },
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true, label: 'Kategori(er)' },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
