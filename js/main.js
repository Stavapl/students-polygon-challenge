let backgroundColor = 0xeeeeee;
let POINTSIZE = 1;
let RADIUSMOD = 60;

let polygon = null;
let app = null;
let container = null;

function generate_polygon(screen_width, screen_height) {
    const num_vertex = 20;

    // punkt środka
    const center = new PIXI.Point(screen_width/2.0, screen_height/2.0);

    // bazowy promień okręgu
    const radius = Math.min(screen_width, screen_height) * 0.15;

    // Losujemy tyle kątów w radianach ile wierzchołków ma mieć poligon ...
    let angles = [];
    for(let i=0; i < num_vertex; i++) {
        angles.push(Math.random() * 2*Math.PI);
    }
    // ... i sortujemy je, aby boki wielokąta nie przecinały się
    angles.sort();

    // tworzymy obiekt Polygon
    polygon = new PIXI.Polygon();

    // ... i dodajemy do niego kolejne wierzchołki. Ich współrzędne są liczone z prostej trygonometrii
    // x = center_x + R*cos(angle)
    // y = center_y + R*sin(angle)
    for(const angle of angles) {
        let radius_rand = -RADIUSMOD + Math.random()*(2*RADIUSMOD);
        polygon.points.push(center.x + (radius+radius_rand)*Math.cos(angle));
        polygon.points.push(center.y + (radius+radius_rand)*Math.sin(angle));
    }

    return polygon;
}

// rysowanie polygona do obiektu Graphics. Zwracany obiekt jest dodawany do hierarchii obiektów PixiJS (do kontenera)
function draw_polygon(polygon) {
    let graph = new PIXI.Graphics();
    graph.beginFill(backgroundColor, 1);
    graph.lineStyle(3, 0x000000, 1);
    graph.drawPolygon(polygon);

    return graph;
}

// rysuje jeden punkt we wskazanej lokalizacji
function draw_point(point, color) {
    let point_gfx = new PIXI.Graphics();
    point_gfx.beginFill(color, 1);
    point_gfx.drawCircle(point.x, point.y, POINTSIZE);
    container.addChild(point_gfx);
}

// handler kliknięcia w kontener z polygonem
function click_event(event) {
    // współrzędne kursora
    let click_location = event.data.global.clone();
    click_location.x = Math.floor(click_location.x);
    click_location.y = Math.floor(click_location.y);

    // TODO: to dobre miejsce żeby zacząć swoje rozwiązanie :)
    let color = Math.random() * 0xffffff;
    draw_point(click_location, color);
}

// entrypoint
(() => {
    const root = document.querySelector('#root');

    // tworzymy aplikację PIXI na cały ekran
    app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: backgroundColor
    });
    root.appendChild(app.view);

    // tworzymy kontener, do którego dodany będzie polygon
    container = new PIXI.Container();
    app.stage.addChild(container);

    // generujemy polygon i dodajemy go do kontenera a tym samym do hierarchii obiektów do wyświetlenia
    polygon = generate_polygon(app.screen.width, app.screen.height);
    container.addChild(draw_polygon(polygon));

    // obsługujemy kliknięcia w kontener
    container.interactive = true;
    container.on('click', click_event)
})();