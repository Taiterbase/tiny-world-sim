import { expect, test } from "@jest/globals";
import { MapSize } from "models";
import { calculateMapBoundary, MAX_HEIGHT, MAX_WIDTH } from "../utilities";

test("1 boundaries are whole numbers", () => {
    let mapSize: MapSize = { height: 9, width: 51 };
    let boundary = calculateMapBoundary(MAX_HEIGHT, MAX_WIDTH, mapSize);

    expect(`0`).toMatch(`${boundary.north % 1}`);
    expect(`0`).toMatch(`${boundary.east % 1}`);
    expect(`0`).toMatch(`${boundary.south % 1}`);
    expect(`0`).toMatch(`${boundary.west % 1}`);
});

test("2 boundaries are whole numbers", () => {
    let mapSize: MapSize = { height: 7, width: 53 };
    let boundary = calculateMapBoundary(MAX_HEIGHT, MAX_WIDTH, mapSize);

    expect(`0`).toMatch(`${boundary.north % 1}`);
    expect(`0`).toMatch(`${boundary.east % 1}`);
    expect(`0`).toMatch(`${boundary.south % 1}`);
    expect(`0`).toMatch(`${boundary.west % 1}`);
});

