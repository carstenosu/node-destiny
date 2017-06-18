'use strict';

var client = require('node-rest-client-promise').Client();
var extend = require('util')._extend

class DestinyClient {
    
    constructor( apiKey, hostUrl ) {
        this.apiKey = apiKey;
        this.hostUrl = hostUrl;

        this.args = {
            headers: { 'X-API-Key': apiKey },
            path: {},
            parameters: { 'definitions': false }
        };
    }

    set definitions( definitions ) {
        this.args.parameters.definitions = definitions;
    }

    search( membershipType, displayName ) {
        this.args.path = { 'membershipType' : membershipType, 'displayName': displayName };
        return client.getPromise( this.hostUrl + '/SearchDestinyPlayer/${membershipType}/${displayName}', this.args);
    }

    getAccountSummary( membershipId ) {
        this.args.path.destinyMembershipId = membershipId;
        return client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Summary', this.args )
    }

    getCharacterSummary( characterId ) {
        this.args.path.characterId = characterId;
        return client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/', this.args )
    }

    getActivityHistory( characterId, params ) {
        this.args.path.characterId = characterId;
        this.args.parameters = extend( this.args.parameters, params );
        return client.getPromise( this.hostUrl + '/Stats/ActivityHistory/${membershipType}/${destinyMembershipId}/${characterId}/', this.args);
    }

    getAdvisorsForAccount( membershipId ) {
        this.args.path.destinyMembershipId = membershipId;
        return client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Advisors/', this.args );
    }

    getAdvisorsForCharacter( characterId ) {
        this.args.path.characterId = characterId;
        return client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Advisors/V2/', this.args );
    }

    getCharacterActivity( characterId ) {
        this.args.path.characterId = characterId;
        return client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Activities', this.args );
    }

    getCharacterInventorySummary( characterId ) {
        this.args.path.characterId = characterId;
        return client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Inventory/Summary/', this.args );
    }

    getCharacterInventoryComplete( characterId ) {
        this.args.path.characterId = characterId;
        return client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Complete/', this.args );
    }

    equipItem( characterId, itemId ) {
        this.args.headers['Content-Type'] = 'application/json';
        this.args.data = { membershipType: this.args.path.membershipType }
        return client.postPromise( this.hostUrl + '/EquipItem/', this.args );
    }

}

exports.DestinyClient = DestinyClient;