Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('targets'); }
});

Router.route('/', {name: 'targetsList'});

Router.route('/target/:_id', {
	name: 'target',
	data: function() {
		//return Targets.findOne(this.params._id);
		var target = Targets.findOne(this.params._id);
		if (typeof target.currentMultiplier !== "undefined") {
			target.days = [];
			target.perDay = Math.pow(target.targetMultiplier, (1/5));
			var currentMultiplier = target.currentMultiplier;
			for (var i=0; i<5; i++) {
				target.days[i] = currentMultiplier * target.perDay;
				currentMultiplier = target.days[i];
			}
			for (var i=0; i<5; i++) {
				target.days[i] = target.days[i].toFixed(2);
			}
		}
		return target;
	}
});

Router.route('/target/:_id/edit', {
	name: 'targetEdit',
  data: function() { return Targets.findOne(this.params._id); }
});

Router.route('/new', {name: 'targetSubmit'});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'target'});
Router.onBeforeAction(requireLogin, {only: ['targetSubmit', 'targetEdit']});