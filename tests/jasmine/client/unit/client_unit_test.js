"use strict";
describe("Client Unit", function () {
	var elem, elem2
	beforeEach(function() {
    elem = $('<input type="postalCode" class="form-control" id="postalCode" placeholder="Please Enter the Postal Code" value="{{postalCode}}">');
	});
	it("Check POSTAL CODE field", function() {
		expect(elem).toBeMatchedBy('#postalCode')
	});
	beforeEach(function() {
    elem2 = $('<button type="button" class="btn btn-primary postalSubmit">Submit</button>');
	});
	it("Check SUBMIT BUTTON field", function() {
		expect(elem2).toBeMatchedBy('.postalSubmit')
	});
});