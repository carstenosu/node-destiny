
var apiKey = process.env.BUNGIE_API_KEY;

var bungieUrl = 'https://www.bungie.net';
var baseUrl = bungieUrl + '/platform/Destiny';

var destiny = require('./src/DestinyClient.js');

var destinyClient = new destiny.DestinyClient( apiKey, baseUrl );

var membershipType = '1';

destinyClient.search(membershipType, 'Carsten').then( function( response ){
    console.log('Got a response!');
    var membership = response.data.Response[0];
    var membershipId = membership.membershipId;
    console.log('Users membership id: ' + membershipId );

    destinyClient.getAccountSummary( membershipType, membershipId ).then( function( response ){
        console.log('Got Membership Summary');
        var characters = response.data.Response.data.characters;
        var grimoireScore = 4615;
        console.log( 'User has ' + characters.length + ' characters and a grimoire score of ' + grimoireScore );

        destinyClient.definitions = true;

        characters.forEach(function(character) {
            console.log( 'Character ' + character.characterBase.characterId + ' light level is: ' + character.characterBase.powerLevel );

            var params = { mode: 'Raid', count: '10', page: '0'}
            destinyClient.getActivityHistory( membershipType, membershipId, character.characterBase.characterId, params ).then(function( response ){
                console.log( 'Raid History for ' + character.characterBase.characterId );
                var raidActivities = response.data.Response.data.activities;
                var raidDefinitions = response.data.Response.definitions;

                raidActivities.forEach( function( raidActivity ){
                    var raidReferenceId = raidActivity.activityDetails.referenceId;
                    console.log( 'You ran ' + raidDefinitions.activities[raidReferenceId].activityName + ' on ' + raidActivity.period );
                })

            });

            destinyClient.getCharacterSummary( membershipType, membershipId, character.characterBase.characterId ).then( function( response ) {
                var characterResponse = response.data.Response.data
                var definitions = response.data.Response.definitions;

                var genderHash = characterResponse.characterBase.genderHash;
                var raceHash = characterResponse.characterBase.raceHash;
                var classHash = characterResponse.characterBase.classHash;

                var genderName = definitions.genders[genderHash].genderName;
                var raceName = definitions.races[raceHash].raceName;
                var className = definitions.classes[classHash].className;


                if ( className == 'Titan') {
                    destinyClient.getCharacterInventorySummary( membershipType, membershipId, character.characterBase.characterId ).then( function( response ){
                        console.log( 'Got Inventory for Titan');
                        var itemDefinitions = response.data.Response.definitions;
                        var items = response.data.Response.data.items;

                        items.forEach( function( item ) {
                            console.log( 'Item is ' + itemDefinitions.items[item.itemHash].itemName );
                        })
                        
                    });

                }

                console.log( 'Got character summary for ' + genderName + ' ' + raceName + ' ' + className );
                console.log( 'Emblem Url: ' + bungieUrl + response.data.Response.data.emblemPath);
                console.log( 'Icon Url: ' + bungieUrl + response.data.Response.data.backgroundPath);
            })
        });

    });

});




