import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Idols = new Mongo.Collection('idols');

Idols.schema = new SimpleSchema({
	surName: {type: String, optional: true},
	givenName: {type: String},
	nickName: {type: String, optional: true},
	createdAt: {type: Date},
	createdBy: {type: String},
	modifiedAt: {type: Date},
	lastModifiedBy: {type: String},
	fullName: {type: String},
});

export const createIdol = new ValidatedMethod({
	name: 'idols.createIdol',
	validate: new SimpleSchema({
		surName: {type: String, optional: true},
		givenName: {type: String},
		nickName: {type: String, optional: true},
	}).validator(),
	run({ surName, givenName, nickName }) {
		// Make sure the user is logged in before inserting a idol
		if (!this.userId) {
			throw new Meteor.Error('Must be logged in to create idols');
		}
		const userId = this.userId;
		Idols.insert({
			surName,
			givenName,
			nickName,
			createdAt: new Date(),
			createdBy: userId,
			modifiedAt: new Date(),
			lastModifiedBy: userId,
			fullName: `${surName} ${givenName}`,
		});
	},
});

Meteor.methods({
	'idols.remove'(idolId) {
		Idols.remove(idolId);
	},
});
