'use strict';

var destiny = function( apiKey ) {

    return {
        headers: { 'X-API-Key': apiKey }
    };
}

var client = require('node-rest-client-promise').Client();

class DestinyClient {
    
    constructor( apiKey, hostUrl ) {
        this.apiKey = apiKey;
        this.hostUrl = hostUrl;

        this.args = {
            headers: { 'X-API-Key': apiKey }
        };
    }

    loadCharacters( membershipType, membershipId ) {
        this.args.path = { 'membershipType' : membershipType, 'displayName': membershipId };
        return client.getPromise( this.hostUrl + '/SearchDestinyPlayer/${membershipType}/${displayName}', this.args);
    }

}

exports.Destiny = DestinyClient;