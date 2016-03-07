Targets = new Mongo.Collection('targets');

Targets.allow({
  update: function(userId, target) { return ownsDocument(userId, target); },
  remove: function(userId, target) { return ownsDocument(userId, target); },
});

Targets.deny({
  update: function(userId, target, fieldNames) {
    // User may only edit the following three fields:
    return (_.without(fieldNames, 'name', 'currentMultiplier', 'targetMultiplier').length > 0);
  }
});

Meteor.methods({
	targetInsert: function(targetAttributes) {
		check(Meteor.userId(), String);
		check(targetAttributes, {
			name: String,
			currentMultiplier: Number,
			targetMultiplier: Number
		});

		var user = Meteor.user();
		var target = _.extend(targetAttributes, {
			userId: user._id, 
			author: user.emails[0].address.substring(0, user.emails[0].address.indexOf('@')), 
			submitted: new Date()
		});

		var targetId = Targets.insert(target);

		return {
			_id: targetId
		};
	}
});