const extend = require('util')._extend;
const promiseClient = require('node-rest-client-promise').Client();

class DestinyClient {
  constructor(apiKey, hostUrl, client = promiseClient) {
    this.client = client;
    this.apiKey = apiKey;
    this.hostUrl = hostUrl;

    this.args = {
      headers: { 'X-API-Key': apiKey },
      path: {},
      parameters: { definitions: false },
    };
  }

  set definitions(definitions) {
    this.args.parameters.definitions = definitions;
  }

  search(membershipType, displayName) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, displayName };
    return this.client.getPromise(`${this.hostUrl}/SearchDestinyPlayer/\${membershipType}/\${displayName}`, localArgs);
  }
  
  getMembershipIdByDisplayName(membershipType, displayName) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, displayName };
    return this.client.getPromise(`${this.hostUrl}/${membershipType}/Stats/GetMembershipIdByDisplayName/${displayName}`, localArgs);
  }

  getAccountSummary(membershipType, membershipId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId };
    return this.client.getPromise(`${this.hostUrl}/\${membershipType}/Account/\${destinyMembershipId}/Summary`, localArgs);
  }

  getCharacterSummary(membershipType, membershipId, characterId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId };
    return this.client.getPromise(`${this.hostUrl}/\${membershipType}/Account/\${destinyMembershipId}/Character/\${characterId}/`, localArgs);
  }

  getActivityHistory(membershipType, membershipId, characterId, params) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId };
    localArgs.parameters = extend(this.args.parameters, params);
    return this.client.getPromise(`${this.hostUrl}/Stats/ActivityHistory/\${membershipType}/\${destinyMembershipId}/\${characterId}/`, localArgs);
  }

  getAdvisorsForAccount(membershipType, membershipId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId };
    return this.client.getPromise(`${this.hostUrl}/\${membershipType}/Account/\${destinyMembershipId}/Advisors/`, localArgs);
  }

  getAdvisorsForCharacter(membershipType, membershipId, characterId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId };
    return this.client.getPromise(`${this.hostUrl}/\${membershipType}/Account/\${destinyMembershipId}/Character/\${characterId}/Advisors/V2/`, localArgs);
  }

  getCharacterActivity(membershipType, membershipId, characterId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId };
    return this.client.getPromise(`${this.hostUrl}/\${membershipType}/Account/\${destinyMembershipId}/Character/\${characterId}/Activities/`, localArgs);
  }

  getAggregateCharacterActivity(membershipType, membershipId, characterId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId };
    return this.client.getPromise(`${this.hostUrl}/Stats/AggregateActivityStats/${membershipType}/${destinyMembershipId}/${characterId}/`, localArgs);
  }

  getCharacterInventorySummary(membershipType, membershipId, characterId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId };
    return this.client.getPromise(`${this.hostUrl}/\${membershipType}/Account/\${destinyMembershipId}/Character/\${characterId}/Inventory/Summary/`, localArgs);
  }

  getCharacterInventoryComplete(membershipType, membershipId, characterId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId };
    return this.client.getPromise(`${this.hostUrl}/\${membershipType}/Account/\${destinyMembershipId}/Character/\${characterId}/Complete/`, localArgs);
  }

  getCharacterProgression(membershipType, membershipId, characterId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId };
    return this.client.getPromise(`${this.hostUrl}/\${membershipType}/Account/\${destinyMembershipId}/Character/\${characterId}/Progression/`, localArgs);
  }

  getAccountItems(membershipType, membershipId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId };
    return this.client.getPromise(`${this.hostUrl}/\${membershipType}/Account/\${destinyMembershipId}/Items/`, localArgs);
  }

  getItems() {
    const localArgs = extend({}, this.args);
    return this.client.getPromise(`${this.hostUrl}/Explorer/Items/`, localArgs);  
  }

  getTalentNodeSteps() {
    const localArgs = extend({}, this.args);
    return this.client.getPromise(`${this.hostUrl}/Explorer/TalentNodeSteps/`, localArgs);  
  }

  getCurrentManifest() {
    const localArgs = extend({}, this.args);
    return this.client.getPromise(`${this.hostUrl}/Manifest/`, localArgs);  
  }

  getManifest( type, id ) {
    const localArgs = extend({}, this.args);
    localArgs.path = { type, id };
    return this.client.getPromise(`${this.hostUrl}/Manifest/${type}/${id}/`, localArgs);  
  }

  getGrimoire( membershipType, membershipId ) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, membershipId };
    return this.client.getPromise(`${this.hostUrl}/Vanguard/Grimoire/${membershipType}/${membershipId}/`, localArgs);
  }

  getGrimoireDefinitions() {
    const localArgs = extend({}, this.args);
    return this.client.getPromise(`${this.hostUrl}/Vanguard/Grimoire/Definition/`, localArgs);
  }

  getHistoricalStats( membershipType, membershipId, characterId ) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId };
    return this.client.getPromise(`${this.hostUrl}/Stats/${membershipType}/${destinyMembershipId}/${characterId}/`, localArgs);
  }

  getHistoricalStatDefinitions() {
    const localArgs = extend({}, this.args);
    return this.client.getPromise(`${this.hostUrl}/Stats/Definition/`, localArgs);
  }

  getAggregateHistoricStats( membershipType, membershipId ) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId  };
    return this.client.getPromise(`${this.hostUrl}/Stats/Account/${membershipType}/${destinyMembershipId}/`, localArgs); 
  }

  getItemDetail( membershipType, membershipId, characterId, itemInstanceId ) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId, itemInstanceId };
    return this.client.getPromise(`${this.hostUrl}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Inventory/${itemInstanceId}`, localArgs); 
  }

  getItemDetailFromHash( membershipType, membershipId, characterId, itemHash ) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId, itemHash };
    return this.client.getPromise(`${this.hostUrl}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/ItemReference/${itemInstanceId}`, localArgs); 
  }

  equipItem(membershipType, membershipId, characterId, itemId) {
    const localArgs = extend({}, this.args);
    localArgs.path = { membershipType, destinyMembershipId: membershipId, characterId, itemId };
    localArgs.headers['Content-Type'] = 'application/json';
    return this.client.postPromise(`${this.hostUrl}/EquipItem/`, localArgs);
  }
}

exports.DestinyClient = DestinyClient;
