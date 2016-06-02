"use strict";

describe('Server Integration', function () {
  it('Server OK', function () {
    expect(true).toBe(true)
  });
  it('Meteor Call', function () {
    var callMeteorMethod = function () {
      expect(typeof Meteor.call('getRegisrtyData', 'PL6 8RU', 1 ,10)).toBe('object')
    }
    expect(callMeteorMethod).not.toThrow()
  });
});