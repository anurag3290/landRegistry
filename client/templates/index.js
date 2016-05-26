Template.home.created = function(){
	var self = this;
	self.bodyData = new ReactiveVar([{}])
	self.postCode = '' 
	self.size = 10
	self.page = 1
}


Template.home.helpers({
	headData : function(){
		var self = Template.instance()
		if(self.bodyData.get() && self.bodyData.get().head && self.bodyData.get().head.vars)
			return self.bodyData.get().head.vars
	},
	landData : function(){
		var self = Template.instance()
		if(self.bodyData.get() && self.bodyData.get().results && self.bodyData.get().results.bindings)
			return self.bodyData.get().results.bindings
	},
	matchData : function(headData, rowData){
		console.log(headData)
		console.log(rowData)
		var returnArray = []
		for(var keys in headData){
			var temp = rowData[headData[keys]] ? rowData[headData[keys]].value : '--'
			returnArray.push(temp)
		}
		return returnArray
	}
})
Template.home.events({
	'click .postalSubmit' : function(event, template){
		var self = Template.instance()
		self.postalCode = $('#postalCode').val()
		console.log(postalCode)
		if(self.postalCode == ''){
			Notifications.error('','Please enter the postal code')
		}
		else{
			$('.pageNo').text('1')
			getData(self.postalCode, 0, self.size)
		}
	},
	'click .next' : function(event, template){
		console.log('1')
		var self = Template.instance()
		self.page = parseInt($('.pageNo').text())+1
		getData(self.postalCode, self.size, self.page)
	}
})

function getData(postalCode, size, page){
	var self = Template.instance()
	Meteor.call('getRegisrtyData', postalCode, size, page, function(err, res){
	if(err){
			console.log(err)
		}
		else{
			var resultData =  JSON.parse(res.success)
			self.bodyData.set(resultData)
			console.log(resultData)
		}
	});
}