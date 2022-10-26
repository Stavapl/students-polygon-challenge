# Polygon Challenge for IT Academic Days 2022 

The challenge is to add a JS code to this base project, that fills the displayed random polygon pixel by pixel starting from the location of mouse click.

### Rules:
* any algorithm is allowed as long as you are not using complex graphics (ie. other polygons)
* you cannot leave any unfilled spots
* you cannot draw beyond the polygon
* the fastest solution wins

**Notice** you will probably end up with A LOT of single pixel objects in PixiJS object-hierarchy. It makes PixiJS itself slow. 
If that's the only bottleneck in your code - Don't worry about that.

The base code is using [PixiJS](https://pixijs.com/) engine to setup the canvas, objects-to-draw hierarchy, base graphics operations and event loop.

Code is documented. Open `index.html` in your favourite browser and start in the `js/main.js` file. Most probably, `click_event` function is where you should start
adding your code.

## Usefull links
* [PixiJS home page](https://pixijs.com/)
* [PixiJS getting started guide](https://pixijs.io/guides/basics/getting-started.html)
* [PixiJS Ticker Docs](https://pixijs.download/release/docs/PIXI.Ticker.html#add) `<----------`
