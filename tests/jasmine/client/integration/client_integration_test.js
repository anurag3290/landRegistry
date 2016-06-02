"use strict";
describe("Client Integration", function () {
	it ("UPPER CASE", function(){
		var uppercase =function(str){
			return str.toUpperCase()
		}
		expect(uppercase('hello World')).toEqual('HELLO WORLD');
	});
});