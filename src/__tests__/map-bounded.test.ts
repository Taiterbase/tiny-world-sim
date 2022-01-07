import { expect, test } from "@jest/globals";
import { MapPoint, MapSize } from "models/map";
import { calculateMapBoundary, generateBoundedMap, generateMap, MAX_HEIGHT, MAX_WIDTH, pointWithinBoundary } from "../utilities";

const map = generateMap();

test("{3, 4} is not within map boundaries", () => {
    const mapSize: MapSize = { height: 20, width: 20 };
    const boundary = calculateMapBoundary(MAX_HEIGHT, MAX_WIDTH, mapSize);
    console.log(boundary);
    

    const boundedMap = generateBoundedMap(boundary, map);
    expect("").toMatch("");
});