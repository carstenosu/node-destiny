
var apiKey = '';
var client = require('node-rest-client-promise').Client();
var destiny = require('./src/main.js').Destiny( apiKey );


var bungieUrl = 'https://www.bungie.net';
var baseUrl = bungieUrl + '/platform/Destiny';

var args = {
    path: { 'membershipType' : 1, 'displayName': 'Carsten' },
    headers: { 'X-API-Key': apiKey }
};

//var Destiny = require('./src/classes/Destiny.js');
//var destinyObject = new Destiny(args.headers['X-API-Key'], baseUrl );


client.getPromise( baseUrl + '/SearchDestinyPlayer/${membershipType}/${displayName}', args).then( function( response ){
    console.log('Got a response!');
    var membership = response.data.Response[0];
    var membershipId = membership.membershipId;
    console.log('Users membership id: ' + membershipId );

    args.path.destinyMembershipId = membershipId;
    client.getPromise( baseUrl + '/${membershipType}/Account/${destinyMembershipId}/Summary/', args ).then( function( response ){
        console.log('Got Membership Summary');
        var characters = response.data.Response.data.characters;
        var grimoireScore = 4615;
        console.log( 'User has ' + characters.length + ' characters and a grimoire score of ' + grimoireScore );

        characters.forEach(function(character) {
            console.log( 'Character ' + character.characterBase.characterId + ' light level is: ' + character.characterBase.powerLevel );

            args.path.characterId = character.characterBase.characterId;
            client.getPromise( baseUrl + '/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/?definitions=true', args ).then( function( response ) {
                var characterResponse = response.data.Response.data
                var definitions = response.data.Response.definitions;

                var genderHash = characterResponse.characterBase.genderHash;
                var raceHash = characterResponse.characterBase.raceHash;
                var classHash = characterResponse.characterBase.classHash;

                var genderName = definitions.genders[genderHash].genderName;
                var raceName = definitions.races[raceHash].raceName;
                var className = definitions.classes[classHash].className;

                console.log( 'Got character summary for ' + genderName + ' ' + raceName + ' ' + className );
                console.log( 'Emblem Url: ' + bungieUrl + response.data.Response.data.emblemPath);
                console.log( 'Icon Url: ' + bungieUrl + response.data.Response.data.backgroundPath);

            } )

        });

    });

});




