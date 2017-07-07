# node-destiny

Node library for interacting with Destiny API

## Installation

```javascript
npm install node-destiny
```

## Example Usage

```javascript
const apiKey = process.env.BUNGIE_API_KEY;
const destinyClient = new destiny.DestinyClient( apiKey );
```

Each method on DestinyClient returns a Promise. Here is an example of of searching for an Xbox player: 

```javascript
// membershipType of '1' means this is an Xbox Player
destinyClient.search('1', 'Carsten').then( response => {
    //do something with the response
});
```

Check out the [DestinyClient](./DestinyClient.js) to see all available methods.

By default, these endpoints will return data that includes unique identifiers for all items, events, activities, etc... In order to look up the corresponding text value of these ids, you must tell the API to return 'definitions' with each call. This is done as follows:

```javascript
destinyClient.definitions = true;
```

This will make all API requests return definitions until you set the field back to false;

For more information about what each method does and paramaters available, see [Bungies API Documentation](https://www.bungie.net/platform/destiny/help/).