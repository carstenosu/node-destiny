
const apiKey = process.env.BUNGIE_API_KEY;
const bungieUrl = 'https://www.bungie.net';
const baseUrl = bungieUrl + '/platform/Destiny';
const destiny = require('../DestinyClient.js');
const destinyClient = new destiny.DestinyClient( apiKey, baseUrl );

const membershipType = '1';

destinyClient.search(membershipType, 'Carsten').then( function( response ){
    const membership = response.data.Response[0];
    const membershipId = membership.membershipId;
    console.log(`Users membership id: ${membershipId}` );

    destinyClient.getAccountSummary( membershipType, membershipId ).then( function( response ){
        console.log('Got Membership Summary');
        const characters = response.data.Response.data.characters;
        const grimoireScore = 4615;
        console.log( `User has ${characters.length} characters and a grimoire score of grimoireScore` );

        destinyClient.definitions = true;

        const characterId1 = characters[0].characterBase.characterId;
        const characterId2 = characters[1].characterBase.characterId;
        const characterId3 = characters[2].characterBase.characterId;

        const params = { mode: 'Raid', count: '10', page: '0'};

        const activitySummary1Promise = destinyClient.getActivityHistory( membershipType, membershipId, characterId1, params );
        const activitySummary2Promise = destinyClient.getActivityHistory( membershipType, membershipId, characterId2, params );
        const activitySummary3Promise = destinyClient.getActivityHistory( membershipType, membershipId, characterId3, params );

        Promise.all( [activitySummary1Promise, activitySummary2Promise, activitySummary3Promise] ).then( characterActivities => {
            console.log('All activity promises resolved');

            characterActivities.forEach ( characterActivity => {
                const raidActivities = characterActivity.data.Response.data.activities;
                const raidDefinitions = characterActivity.data.Response.definitions;

                raidActivities.forEach( function( raidActivity ){
                    const raidReferenceId = raidActivity.activityDetails.referenceId;
                    console.log( `You ran ${raidDefinitions.activities[raidReferenceId].activityName}  on ${raidActivity.period}` );
                })
            })

        } );

        const characterSummary1Promise = destinyClient.getCharacterSummary( membershipType, membershipId, characterId1 );
        const characterSummary2Promise = destinyClient.getCharacterSummary( membershipType, membershipId, characterId2 );
        const characterSummary3Promise = destinyClient.getCharacterSummary( membershipType, membershipId, characterId3 );

        Promise.all( [characterSummary1Promise, characterSummary2Promise, characterSummary3Promise]).then( characterSummaries => {
            characterSummaries.forEach( characterSummary => {
                const characterResponse = characterSummary.data.Response.data
                const definitions = characterSummary.data.Response.definitions;

                const genderHash = characterResponse.characterBase.genderHash;
                const raceHash = characterResponse.characterBase.raceHash;
                const classHash = characterResponse.characterBase.classHash;

                const genderName = definitions.genders[genderHash].genderName;
                const raceName = definitions.races[raceHash].raceName;
                const className = definitions.classes[classHash].className;

                if ( className == 'Titan') {
                    destinyClient.getCharacterInventorySummary( membershipType, membershipId, characterResponse.characterBase.characterId ).then( function( response ){
                        console.log( 'Got Inventory for Titan');
                        const itemDefinitions = response.data.Response.definitions;
                        const items = response.data.Response.data.items;

                        items.forEach( function( item ) {
                            console.log( `Item is ${itemDefinitions.items[item.itemHash].itemName}` );
                        })
                        
                    });

                }

                console.log( `Got character summary for ${genderName} ${raceName} ${className}` );
                console.log( `Emblem Url: ${bungieUrl} ${characterSummary.data.Response.data.emblemPath}` );
                console.log( `Icon Url: ${bungieUrl} ${characterSummary.data.Response.data.backgroundPath}` );
            })
             
        });

    });

});




