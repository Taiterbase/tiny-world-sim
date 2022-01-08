import { expect, test } from "@jest/globals";
import { MapSize } from "models";
import { calculateMapBoundary, clearMap, generateMap, getIslands, getLands, MAX_HEIGHT, MAX_WIDTH, pointWithinBoundary } from "../utilities";

const map = generateMap();
const mapSize: MapSize = { height: 20, width: 20 };
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
    let mlm = getLands(boundary, map);
    expect(mlm).toEqual(10);
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


test("generated map has 1 island", () => {
    expect(pointWithinBoundary({ x: 50, y: 51 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 50, y: 52 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 50, y: 53 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 50, y: 54 }, boundary)).toEqual(true);
    map[51][50] = true;
    map[52][50] = true;
    map[53][50] = true;
    map[54][50] = true;
    let islands = getIslands(boundary, map);
    expect(islands).toEqual(1);
    clearMap(map);
});


test("generated map has 4 islands", () => {
    expect(pointWithinBoundary({ x: 50, y: 51 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 51, y: 52 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 52, y: 53 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 53, y: 54 }, boundary)).toEqual(true);
    map[51][50] = true;
    map[52][51] = true;
    map[53][52] = true;
    map[54][53] = true;
    let islands = getIslands(boundary, map);
    expect(islands).toEqual(4);
    clearMap(map);
});


test("generated map has 2 islands", () => {
    expect(pointWithinBoundary({ x: 49, y: 49 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 49, y: 50 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 52, y: 53 }, boundary)).toEqual(true);
    expect(pointWithinBoundary({ x: 52, y: 52 }, boundary)).toEqual(true);
    map[49][49] = true;
    map[49][49] = true;
    map[53][52] = true;
    map[52][52] = true;
    let islands = getIslands(boundary, map);
    expect(islands).toEqual(2);
    clearMap(map);
});