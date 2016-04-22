Template.targetEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var currentTargetId = this._id;

		var targetProperties = {
			days: parseInt($(e.target).find('[name=days]').val(), 10),
			name: $(e.target).find('[name=name]').val(),
			currentMultiplier: parseFloat($(e.target).find('[name=current-multiplier]').val(), 10),
			targetMultiplier: parseFloat($(e.target).find('[name=target-multiplier]').val(), 10)
		};

		Targets.update(currentTargetId, {$set: targetProperties}, function(error) {
			if (error) {
				alert(error);
			} else {
				Router.go('target', {_id: currentTargetId});
			}
		});
	},

	'click .btn-delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this post?")) {
			var currentTargetId = this._id;
			Targets.remove(currentTargetId);
			Router.go('targetsList');
		}
	}
});