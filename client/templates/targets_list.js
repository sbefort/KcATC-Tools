Template.targetsList.helpers({
	targets: function() {
		return Targets.find({}, {sort: {submitted: -1}});
	}
});