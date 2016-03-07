Template.targetSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var target = {
			name: $(e.target).find('[name=name]').val(),
			currentMultiplier: parseFloat($(e.target).find('[name=current-multiplier]').val(), 10),
			targetMultiplier: parseFloat($(e.target).find('[name=target-multiplier]').val(), 10)
		};

		Meteor.call('targetInsert', target, function(error, result) {
			
			if (error) {
				return alert(error.reason);
			}

			Router.go('target', {_id: result._id});
		});
  }
});