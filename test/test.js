const assert = require('assert');
const sinon = require('sinon');

const destiny = require('../DestinyClient.js');
var client = require('node-rest-client-promise');


describe( 'DestinyClient', function() {
    describe('constructor', function() {
        it('should return a new DestinyClient object', function(){
            const destinyClient = new destiny.DestinyClient(process.env.BUNGIE_API_KEY, 'https://www.bungie.net/platform/Destiny');
            assert.equal(process.env.BUNGIE_API_KEY, destinyClient.args.headers['X-API-Key']);
            assert.equal('https://www.bungie.net/platform/Destiny', destinyClient.hostUrl);
        });
    });

    // describe('search', function(){
    //     it('should search Destiny API for a user', function(){
    //         var stubClient = sinon.createStubInstance(client.Client);
    //         const destinyClient = new destiny.DestinyClient(process.env.BUNGIE_API_KEY, 'https://www.bungie.net/platform/Destiny');
    //         destinyClient.client = new stubClient();
    //         var promise = destinyClient.search('1','Carsten');
    //     })
    // })
});