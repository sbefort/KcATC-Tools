Template.target.helpers({
	ownPost: function() {
		return this.userId === Meteor.userId();
	},
	add: function(original, incrementer) {
		return original + incrementer;
	}
});