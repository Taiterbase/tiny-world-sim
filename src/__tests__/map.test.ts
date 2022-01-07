import { expect, test } from "@jest/globals";
import { MapSize } from "models/map";
import { calculateMapBoundary, clearMap, generateMap, getIslands, getLands, MAX_HEIGHT, MAX_WIDTH, pointWithinBoundary } from "../utilities";

const map = generateMap();
const mapSize: MapSize = { height: 10, width: 10 };
const boundary = calculateMapBoundary(MAX_HEIGHT, MAX_WIDTH, mapSize);

test("generated map has 10 landmarks", () => {
    let i = 0;
    while (i < 10) {
        let y = Math.floor(Math.random() * (boundary.south - boundary.north) + boundary.north);
        let x = Math.floor(Math.random() * (boundary.east - boundary.west) + boundary.west);
        expect(pointWithinBoundary({ x, y }, boundary)).toEqual(true);
        if (map[y][x] === true) i--;
        map[y][x] = true;
        i++;
    }
    let lands = getLands(boundary, map);
    expect(lands).toEqual(i);
    clearMap(map);
});

test("generated map has 1 island", () => {
    expect(pointWithinBoundary({ x: 50, y: 51 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 51, y: 51 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 52, y: 51 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 53, y: 51 }, boundary)).toEqual(true);
    map[51][50] = true;
    map[51][51] = true;
    map[51][52] = true;
    map[51][53] = true;
    let islands = getIslands(boundary, map);
    expect(islands).toEqual(1);
    clearMap(map);
});