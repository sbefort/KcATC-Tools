Meteor.publish('targets', function() {
	return Targets.find();
});