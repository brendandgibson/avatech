# avatech
Compass selector demonstration

## Design Review

### Current implementation

![Current UI](https://github.com/brendandgibson/avatech/blob/master/images/avatech.png)

#### Pros

* The fine selection allows exact degree selection.
* Once the user has used this UI, the actions are memorable.
* Selection can be made in two clicks.
* The compass image is easily understandable.

#### Cons

* It takes a moment for the user to understand the functionality.
* Two compasses looks like overkill.
* Click targets are small.

## App

### Setup

You must have node and npm installed. I have node v4.4.0 and npm v3.8.2 working on a mac.
The server requires read/write access to the `/tmp` directory, and read access to the `public` directory.

* `npm install`
* `gulp`
* `node node/server.js`
* Open a browser to http://127.0.0.1:7000/
