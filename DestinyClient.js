'use strict';

const extend = require('util')._extend

class DestinyClient {
    
    constructor( apiKey, hostUrl ) {
        this.client = require('node-rest-client-promise').Client();
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
        const localArgs = extend( {}, this.args);
        localArgs.path = { 'membershipType' : membershipType, 'displayName': displayName };
        return this.client.getPromise( this.hostUrl + '/SearchDestinyPlayer/${membershipType}/${displayName}', localArgs );
    }

    getAccountSummary( membershipType, membershipId ) {
        const localArgs = extend( {}, this.args);
        localArgs.path = { 'membershipType' : membershipType, 'destinyMembershipId': membershipId };
        return this.client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Summary', localArgs )
    }

    getCharacterSummary( membershipType, membershipId, characterId ) {
        const localArgs = extend( {}, this.args);
        localArgs.path = { 'membershipType' : membershipType, 'destinyMembershipId': membershipId, 'characterId': characterId };
        return this.client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/', localArgs )
    }

    getActivityHistory( membershipType, membershipId, characterId, params ) {
        const localArgs = extend( {}, this.args);
        localArgs.path = { 'membershipType' : membershipType, 'destinyMembershipId': membershipId, 'characterId': characterId };
        localArgs.parameters = extend( this.args.parameters, params );
        return this.client.getPromise( this.hostUrl + '/Stats/ActivityHistory/${membershipType}/${destinyMembershipId}/${characterId}/', localArgs );
    }

    getAdvisorsForAccount( membershipType, membershipId ) {
        const localArgs = extend( {}, this.args);
        localArgs.path = { 'membershipType' : membershipType, 'destinyMembershipId': membershipId };
        return this.client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Advisors/', localArgs );
    }

    getAdvisorsForCharacter( membershipType, membershipId, characterId ) {
        this.args.path.characterId = characterId;
        return this.client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Advisors/V2/', localArgs );
    }

    getCharacterActivity( membershipType, membershipId, characterId ) {
        const localArgs = extend( {}, this.args);
        localArgs.path = { 'membershipType' : membershipType, 'destinyMembershipId': membershipId, 'characterId': characterId };
        return this.client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Activities', localArgs );
    }

    getCharacterInventorySummary( membershipType, membershipId, characterId ) {
        const localArgs = extend( {}, this.args);
        localArgs.path = { 'membershipType' : membershipType, 'destinyMembershipId': membershipId, 'characterId': characterId };
        return this.client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Inventory/Summary/', localArgs );
    }

    getCharacterInventoryComplete( membershipType, membershipId, characterId ) {
        const localArgs = extend( {}, this.args);
        localArgs.path = { 'membershipType' : membershipType, 'destinyMembershipId': membershipId, 'characterId': characterId };
        return this.client.getPromise( this.hostUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Complete/', localArgs );
    }

    equipItem( membershipType, membershipId, characterId, itemId ) {
        const localArgs = extend( {}, this.args);
        localArgs.path = { 'membershipType' : membershipType, 'destinyMembershipId': membershipId, 'characterId': characterId };
        localArgs.headers['Content-Type'] = 'application/json';
        return this.client.postPromise( this.hostUrl + '/EquipItem/', localArgs );
    }

}

exports.DestinyClient = DestinyClient;