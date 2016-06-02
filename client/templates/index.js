Template.home.created = function(){
	var self = this;
	self.bodyData = new ReactiveVar([{}])
	self.postalCode = '' 
	self.size = 10
	self.page = new ReactiveVar(1)
	Session.set('tableResonse', true)
	Session.set('showTable', false)
}


Template.home.helpers({
	headData : function(){
		var self = Template.instance()
		if(self.bodyData.get() && self.bodyData.get().head && self.bodyData.get().head.vars)
			return self.bodyData.get().head.vars
		else
			return []
	},
	landData : function(){
		var self = Template.instance()
		if(self.bodyData.get() && self.bodyData.get().results && self.bodyData.get().results.bindings)
			return self.bodyData.get().results.bindings
	},
	matchData : function(headData, rowData){
		var returnArray = []
		for(var keys in headData){
			var temp = rowData[headData[keys]] ? rowData[headData[keys]].value : '--'
			returnArray.push(temp)
		}
		return returnArray
	},
	pageNo : function(){
		var self = Template.instance()
		return self.page.get()
	},
	postalCode : function(){
		var self = Template.instance()
		return self.postalCode
	},
	tableResonse : function(){
		return Session.get('tableResonse')
	},
	disablePrev : function(){
		var self = Template.instance()
		if(self.page.get() == 1)
			return 'disabled'
		else
			return ''
	},
	disableNext : function(){
		var self = Template.instance()
		var temp = self.bodyData.get()
		if(temp && temp.results && temp.results.bindings && temp.results.bindings.length == self.size)
			return ''
		else
			return 'disabled'
	},
	showTable : function(){
		return Session.get('showTable')
	}
})
Template.home.events({
	'click .postalSubmit' : function(event, template){
		var self = Template.instance()
		self.postalCode = uppercase($('#postalCode').val())
		self.page.set(1)
		if(self.postalCode == ''){
			Notifications.error('','Please enter the postal code')
		}
		else{
			getData(self.postalCode, self.page.get(), self.size)
		}
	},
	'click .previous' : function(event, template){

		if($($('.previous').closest('.page-item')).hasClass('disabled'))
			return false

		var self = Template.instance()
		if(self.postalCode == ''){
			Notifications.error('','Please enter the postal code')
		}
		else{
			self.page.set(self.page.get() -1)
			getData(self.postalCode, self.page.get(), self.size)
		}
	},
	'click .next' : function(event, template){

		if($($('.next').closest('.page-item')).hasClass('disabled'))
			return false

		var self = Template.instance()
		if(self.postalCode == ''){
			Notifications.error('','Please enter the postal code')
		}
		else{
			self.page.set(self.page.get()+1)
			getData(self.postalCode, self.page.get(), self.size)
		}
	}
})

function getData(postalCode, page, size){
	var self = Template.instance()
	Session.set('tableResonse', false)
	Session.set('showTable', true)
	Meteor.call('getRegisrtyData', postalCode, page, size, function(err, res){
		Session.set('tableResonse', true)
		if(err){
			console.log(err)
		}
		else{
			var resultData =  JSON.parse(res.success)
			self.bodyData.set(resultData)
		}
	});
}

function uppercase(str){
	return str.toUpperCase()
}