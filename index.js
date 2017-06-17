
var apiKey = '';

var bungieUrl = 'https://www.bungie.net';
var baseUrl = bungieUrl + '/platform/Destiny';

var destiny = require('./src/main.js');

var destinyInstance = new destiny.Destiny( apiKey, baseUrl );
destinyInstance.search('1', 'Carsten').then( function( response ){
    console.log('Got a response!');
    var membership = response.data.Response[0];
    var membershipId = membership.membershipId;
    console.log('Users membership id: ' + membershipId );

    destinyInstance.getAccountSummary( membershipId ).then( function( response ){
        console.log('Got Membership Summary');
        var characters = response.data.Response.data.characters;
        var grimoireScore = 4615;
        console.log( 'User has ' + characters.length + ' characters and a grimoire score of ' + grimoireScore );

        destinyInstance.definitions = true;

        characters.forEach(function(character) {
            console.log( 'Character ' + character.characterBase.characterId + ' light level is: ' + character.characterBase.powerLevel );

            destinyInstance.getCharacterSummary( character.characterBase.characterId ).then( function( response ) {
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
            })
        });

    });

});




