Template.targetsList.helpers({
	targets: function() {
		return Targets.find({userId: Meteor.userId()}, {sort: {submitted: -1}});
	}
});