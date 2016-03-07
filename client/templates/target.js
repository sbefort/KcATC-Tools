Template.target.helpers({
	ownPost: function() {
		return this.userId === Meteor.userId();
	}
});