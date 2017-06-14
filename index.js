var client = require('node-rest-client-promise').Client();

var baseUrl = 'https://www.bungie.net/platform/Destiny';

var args = {
    path: { 'membershipType' : 1, 'displayName': 'Carsten' },
    headers: { 'X-API-Key': '' }
};

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
        });


    });

});




