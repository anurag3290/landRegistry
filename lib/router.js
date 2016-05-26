Router.onBeforeAction(function() {

	var urls = ['/home']

	if(urls.indexOf(this.url) > -1){
		this.render(this.url);
	}
	else
		Router.go('home')
})
Router.map(function(){
	this.route('/home', function () {
		this.render('home');
	}),
	this.route('/(.*)', function () {
		this.render('home');
	})
})