import { expect, test } from "@jest/globals";
import { MapSize } from "models";
import { calculateMapBoundary, clearMap, generateBoundedMap, generateMap, getIslands, getLands, MAX_HEIGHT, MAX_WIDTH, pointWithinBoundary } from "../utilities";

const map = generateMap();
const mapSize: MapSize = { height: 10, width: 10 };
const boundary = calculateMapBoundary(MAX_HEIGHT, MAX_WIDTH, mapSize);
test("generated map and generated bounded map have same values", () => {
    let i = 0;
    while (i < 10) {
        let y = Math.floor(Math.random() * (boundary.south - boundary.north + 1) + boundary.north);
        let x = Math.floor(Math.random() * (boundary.east - boundary.west + 1) + boundary.west);
        map[y][x] = true;
        const boundedMap = generateBoundedMap(boundary, map);
        expect(map[y][x]).toEqual(boundedMap[y][x]);
        i++;
    }
    clearMap(map);
});

test("generated map and bounded map have the same landmarks", () => {
    let i = 0;
    while (i < 10) {
        let y = Math.floor(Math.random() * (boundary.south - boundary.north) + boundary.north);
        let x = Math.floor(Math.random() * (boundary.east - boundary.west) + boundary.west);
        expect(pointWithinBoundary({ x, y }, boundary)).toEqual(true);
        if (map[y][x] === true) i--;
        map[y][x] = true;
        i++;
    }
    let boundedMap = generateBoundedMap(boundary, map);
    let boundedLands = getLands(boundary, boundedMap);
    let lands = getLands(boundary, map);
    expect(boundedLands).toEqual(lands);
    clearMap(map);
});

test("generated map and bounded map have the same islands", () => {
    expect(pointWithinBoundary({ x: 50, y: 51 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 51, y: 51 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 52, y: 51 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 53, y: 51 }, boundary)).toEqual(true);
    map[51][50] = true;
    map[51][51] = true;
    map[51][52] = true;
    map[51][53] = true;
    let boundedMap = generateBoundedMap(boundary, map);
    let boundedIslands = getIslands(boundary, boundedMap);
    let islands = getIslands(boundary, map);
    expect(boundedIslands).toEqual(islands);
    clearMap(map);
});