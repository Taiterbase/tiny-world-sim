import { Map, MapBoundary, MapPoint, MapProviderValues, MapSize } from "models/map";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { calculateMapBoundary, MAX_HEIGHT, MAX_WIDTH, pointWithinBoundary } from "utilities/map";


export const MapContext = createContext<MapProviderValues>(null);

// MapProvider offers an interface for the grid of cells on the map
export function MapProvider(props: { children: ReactNode }) {
    const { children } = props;
    const [mapSize, setMapSize] = useState<MapSize>({ height: 10, width: 20 });
    const [mapBoundary, setMapBoundary] = useState<MapBoundary>(undefined);
    const [map, setMap] = useState<Map>(() => {
        let arr: boolean[][] = [];
        for (let i = 0; i < MAX_HEIGHT; i++) {
            arr[i] = [];
            for (let ii = 0; ii < MAX_WIDTH; ii++) {
                arr[i][ii] = false;
            }
        }
        return arr;
    });

    // useEffect[] initializes values and sets up listeners
    useEffect(() => {
        // Initialize the map with max values.
        (async () => await setMapGridSize({ height: 100, width: 100 }));
        (async () => setMap(await initializeMap()));
        setMapBoundary(calculateMapBoundary(map.length, map[0].length, mapSize));
    }, []);

    // useEffect[mapSize] resets map boundaries after a mapSize change
    useEffect(() => {
        setMapBoundary(calculateMapBoundary(map.length, map[0].length, mapSize));
    }, [mapSize]);

    // initializeMap initializes the map!
    const initializeMap = (): Promise<Map> => {
        return new Promise((resolve, _reject) => {
            let arr: boolean[][] = [];
            for (let i = 0; i < MAX_HEIGHT; i++) {
                arr[i] = [];
                for (let ii = 0; ii < MAX_WIDTH; ii++) {
                    arr[i][ii] = false;
                }
            }
            return resolve(arr);
        });
    }

    // getMap returns the raw boolean[][]
    const getMap = (): Map => {
        return map;
    }

    // getBoundedMap returns the bounded map area
    const getBoundedMap = (): Map => {
        let boundedMap: boolean[][] = [];
        for (let i = mapBoundary.north; i < mapBoundary.south; i++) {
            boundedMap[i] = [];
            for (let ii = mapBoundary.west; ii < mapBoundary.east; ii++) {
                boundedMap[i][ii] = map[i][ii];
            }
        }
        return boundedMap;
    }

    // getMapSize gets the current map size
    const getMapGridSize = (): MapSize => {
        return {
            height: mapSize.height,
            width: mapSize.width
        };
    }

    // setMapSize sets the map size within the current limits, without
    // altering the root 2d array
    const setMapGridSize = async (size: MapSize): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (isValidSize(size)) {
                setMapSize(size);
                resolve();
            }
            else {
                reject(`Dimensions are out of bounds. Please submit a map size within a ${MAX_WIDTH} x ${MAX_HEIGHT} rectangle.`);
            }
        })
    }

    // getMapBoundary returns the padded map boundary
    const getMapBoundary = (): MapBoundary => {
        if (!mapBoundary) return calculateMapBoundary(map.length, map[0].length, mapSize);
        return mapBoundary;
    }

    // getCell returns the value at `Point`.
    const getCell = (point: MapPoint): boolean => {
        return map[point.y][point.x];
    }

    // setCell toggles the provided cell at `point`. 
    const setCell = async (point: MapPoint): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (pointWithinBoundary(point, mapBoundary)) {
                let newMap = [...map];
                let pointValue: boolean = map[point.y][point.x];
                newMap[point.y][point.x] = !pointValue;
                setMap(newMap);
                resolve();
            } else {
                reject(`Point ${point} is out-of-bounds.`);
            }
        });
    }

    const getNumberOfLands = (): number => {
        const boundary = getMapBoundary();
        let numLand = 0;
        for (let i = boundary.north; i < boundary.south; i++) {
            for (let ii = boundary.west; ii < boundary.east; ii++) {
                if (map[i][ii] === true) {
                    numLand++;
                }   
            }
        }
        return numLand;
    }

    const getNumberOfIslands = (): number => {
        const boundary = getMapBoundary();
        let numIslands = 0;
        let set = new Set();
        const dfs = (point: MapPoint) => {
            if (!pointWithinBoundary(point, boundary)) return;
            if (!set.has(JSON.stringify(point)) &&
                map[point.y][point.x] === true) {
                set.add(JSON.stringify(point));
                dfs({ x: point.x + 1, y: point.y })
                dfs({ x: point.x - 1, y: point.y })
                dfs({ x: point.x, y: point.y + 1 })
                dfs({ x: point.x, y: point.y - 1 })
            }
        }

        for (let i = boundary.north; i < boundary.south; i++) {
            for (let ii = boundary.west; ii < boundary.east; ii++) {
                let point: MapPoint = { x: ii, y: i };
                if (map[i][ii] === true && !set.has(JSON.stringify(point))) {
                    numIslands++;
                    dfs(point);
                }
            }
        }
        return numIslands;
    }

    // isValidSize verifies if the parameter is within bounds
    const isValidSize = (size: MapSize) => {
        if (size.height > MAX_HEIGHT) return false;
        if (size.width > MAX_WIDTH) return false;
        if (size.width < 0 || size.height < 0) return false;
        if (size.width === 0 && size.height === 0) return false;
        return true;
    }

    // list of values associated with the provider. like an interface..
    const values: MapProviderValues = {
        getMap,
        getBoundedMap,
        getMapGridSize,
        setMapGridSize,
        getMapBoundary,
        getCell,
        setCell,
        getNumberOfIslands,
        getNumberOfLands,
    };

    return (
        <MapContext.Provider value={values}>{children}</MapContext.Provider>
    );
}

// useMap is the context hook
export const useMap = () => {
    const context = useContext(MapContext);
    if (context === undefined) {
        throw new Error("`useMap` hook must be used within a `MapContext` component.");
    }
    return context;
};