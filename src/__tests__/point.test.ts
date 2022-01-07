import { expect, test } from "@jest/globals";
import { MapPoint, MapSize } from "models/map";
import { calculateMapBoundary, MAX_HEIGHT, MAX_WIDTH, pointWithinBoundary } from "../utilities";

let mapSize: MapSize = { height: 9, width: 51 };
let boundary = calculateMapBoundary(MAX_HEIGHT, MAX_WIDTH, mapSize);
console.log(`Map Boundaries: ${JSON.stringify(boundary)}`);

test("{3, 4} is not within map boundaries", () => {
    let point: MapPoint = { x: 3, y: 4 }
    
    expect("false").toMatch(`${pointWithinBoundary(point, boundary)}`);
});

test("{50, 48} is within map boundary", () => {
    let point: MapPoint = { x: 50, y: 48 }
    
    expect("true").toMatch(`${pointWithinBoundary(point, boundary)}`);
});

test("{25, 45} is not within map boundary", () => {
    let point: MapPoint = { x: 25, y: 45 }
    
    expect("false").toMatch(`${pointWithinBoundary(point, boundary)}`);
});

test("{25, 45} is within map boundary", () => {
    let point: MapPoint = { x: 25, y: 46 }
    
    expect("true").toMatch(`${pointWithinBoundary(point, boundary)}`);
});
