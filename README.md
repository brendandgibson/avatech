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
* Two compasses looks like overkill and is confusing to the user.
* Click targets are small.

### Aspect and Elevation in one

![Aspect and Elevation in one](https://github.com/brendandgibson/avatech/blob/master/images/uac.png?raw=true)

In this example, the user would select the desired aspects and elevations by clicking on the sections to toggle them on an off.

#### Pros

* Uses a familiar avalanche rose that users would have seen on Avalanche Forecast websites.
* Condenses two widgets for filtering into one.
* Looks cool.
* Enables user to visualise the mountain easily.

#### Cons

* Could be difficult to implement.
* There would have to be a call to action to explain to the user that they can click the segments to toggle them.
* Visually cluttered on a small display.
* Small targets.

### Single Compass

![Selecting](https://github.com/brendandgibson/avatech/blob/master/images/selecting.png?raw=true)
![Selected](https://github.com/brendandgibson/avatech/blob/master/images/selected.png?raw=true)

This is the design that I implemented. It packs the two compasses from the current implementation into one, with the user clicking and dragging across the aspects that they want to filter.

#### Pros

* One widget instead of two.
* Very simple, but with enough information for the user to recognise a compass.
* Larger target areas.
* Clear design.
* Memorable interaction once used.
* Only one click.

#### Cons

* It is not immediately obvious how to engage with this widget.
* Not accessible.
* Is helped by a call to action.
* Some quirks in selection (totally blamed on the implementation...)

## App

### Setup

You must have node and npm installed. I have node v4.4.0 and npm v3.8.2 working on a mac.
The server requires read/write access to the `/tmp` directory, and read access to the `public` directory.

* git clone <URL from above>
* `cd avatech`
* `npm install`
* `gulp`
* `node node/server.js`
* Open a browser to http://127.0.0.1:7000/

### To Use

Once you have navigated to the page, click on the `ASPECT` tab in the navigation. This will expose a dropdown with a compass on it. Drag your mouse around the compass perimeter to select the aspects.

### TODO

* Mouse drag implementation is naiive. It does not handle edge cases including moving the mouse backwards.
* Animation for the dropdown opening.
* Filtering of objects on the map as a result of the aspect selector changing.
* Finetuning the stroke-dasharray (dashed circle line).
