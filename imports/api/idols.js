import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Idols = new Mongo.Collection('idols');

Meteor.methods({
	'idols.insert'(idolEntity) {
		check(idolEntity, {
			surName: Match.Maybe(String),
			givenName: String,
			nickName: Match.Maybe(String),
		});

		// Make sure the user is logged in before inserting a idol
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}
		const username = Meteor.users.findOne(this.userId).username;
		Idols.insert({
			createdAt: new Date(),
			createdBy: username,
			modifiedAt: new Date(),
			lastModifiedBy: username,
			fullName : `${idolEntity.surName} ${idolEntity.givenName}`,
		});
	},
	'idols.remove'(idolId) {
		check(idolId, String);
		Idols.remove(idolId);
	},
});