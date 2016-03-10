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
		var target = Targets.findOne({_id:this.params._id, userId:Meteor.userId()});

		if (typeof target.currentMultiplier !== "undefined") {
			target.week1 = [];
			target.week2 = [];
			target.perDay = Math.pow(target.targetMultiplier, (1/5));
			var currentMultiplier = target.currentMultiplier;
			for (var i=0; i<5; i++) {
				target.week1[i] = currentMultiplier * target.perDay;
				currentMultiplier = target.week1[i];
			}
			for (var i=0; i<5; i++) {
				target.week2[i] = currentMultiplier * target.perDay;
				currentMultiplier = target.week2[i];
			}
			for (var i=0; i<5; i++) {
				target.week1[i] = target.week1[i].toFixed(2);
				target.week2[i] = target.week2[i].toFixed(2);
			}
		}
		return target;
	}
});

Router.route('/target/:_id/edit', {
	name: 'targetEdit',
  data: function() { return Targets.findOne({_id:this.params._id, userId:Meteor.userId()}); }
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