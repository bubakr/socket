var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');


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


describe('Generate Location Message', ()=>{
    it('Should generate correct location object', ()=>{
        var from = 'Username';
        var longitude = '123';
        var latitude = '456';

        var location = generateLocationMessage(from, latitude, longitude);
        expect(location.from).toEqual(from);
        expect(location.url).toEqual(`https://www.google.com/maps?q=${latitude},${longitude}`);

    })
});
