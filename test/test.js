const assert = require('assert');
const sinon = require('sinon');
const extend = require('util')._extend;

const destiny = require('../DestinyClient.js');
var client = require('node-rest-client-promise');

const bungieHostUrl = 'https://www.bungie.net/platform/Destiny';

describe( 'DestinyClient', function() {
    describe('constructor', function() {
        it('should return a new DestinyClient object', function(){
            const destinyClient = new destiny.DestinyClient(process.env.BUNGIE_API_KEY, bungieHostUrl);
            assert.equal(process.env.BUNGIE_API_KEY, destinyClient.args.headers['X-API-Key']);
            assert.equal('https://www.bungie.net/platform/Destiny', destinyClient.hostUrl);
        });
    });

    describe('search', function(){
        it('should search Destiny API for a user', function(){
            var membershipType = '1';
            var displayName = 'Carsten';

            const destinyClient = new destiny.DestinyClient(process.env.BUNGIE_API_KEY, bungieHostUrl);
            sinon.stub( destinyClient.client, 'getPromise').resolves({bungie:'response'});
            var promise = destinyClient.search( membershipType, displayName );

            var expectedArgs = extend( {}, destinyClient.args);
            expectedArgs.path = { 'membershipType' : membershipType, 'displayName': displayName };

            assert( destinyClient.client.getPromise.calledWithMatch( bungieHostUrl + '/SearchDestinyPlayer/${membershipType}/${displayName}', expectedArgs ) );
            promise.then( response => {
                assert.equal( response.bungie, 'response');
            });
        });
    });

    describe('getAccountSummary', function(){
        it('should get Account Summary from the Destiny API', function(){
            var membershipType = '1';
            var membershipId = '12345';
            
            const destinyClient = new destiny.DestinyClient(process.env.BUNGIE_API_KEY, bungieHostUrl);
            var promise = destinyClient.getAccountSummary(membershipType, membershipId);

            var expectedArgs = extend( {}, destinyClient.args);
            expectedArgs.path = { 'membershipType' : membershipType, 'destinyMembershipId': membershipId };

            assert( destinyClient.client.getPromise.calledWithMatch( bungieHostUrl + '/${membershipType}/Account/${destinyMembershipId}/Summary', expectedArgs ) );
            promise.then( response => {
                assert.equal( response.bungie, 'response');
            });
        });
    });
});