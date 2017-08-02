var expect = require('expect');
var {generateMessage} = require('./message.js');


describe('generateMessage', ()=>{
    it('should generateMessage', ()=>{
        var from = 'Username';
        var text = 'This is a message';

        var message = generateMessage(from, text);
        expect(message.createdAt).toBeA('number');
        expect(message.from).toEqual(from);
        expect(message.text).toEqual(text);
    });
});
