import { Map, MapBoundary, MapPoint, MapProviderValues, MapSize } from "models/map";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { calculateMapBoundary, MAX_HEIGHT, MAX_WIDTH, pointWithinBoundary } from "utilities/map";


export const MapContext = createContext<MapProviderValues>(null);

// MapProvider offers an interface for the grid of cells on the map
export function MapProvider(props: { children: ReactNode }) {
    const { children } = props;
    const [mapSize, setMapSize] = useState<MapSize>({ height: 20, width: 20 });
    const [mapBoundary, setMapBoundary] = useState<MapBoundary>({ north: 40, south: 40, east: 40, west: 40 });
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
    const [islands, setIslands] = useState<number>(0);

    // useEffect[] initializes values and sets up listeners
    useEffect(() => {
        // Initialize the map with max values.
        (async () => await setMapGridSize({ height: 20, width: 20 }));
        (async () => setMap(await initializeMap()));
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
                refreshCells();
                resolve();
            }
            else {
                reject("Dimensions are out of bounds. Please submit a map size within a 1000 x 1000 rectangle.");
            }
        })
    }

    // getMapBoundary returns the padded map boundary
    const getMapBoundary = (): MapBoundary => {
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

    // isValidSize verifies if the parameter is within bounds
    const isValidSize = (size: MapSize) => {
        if (size.height > MAX_HEIGHT) return false;
        if (size.width > MAX_WIDTH) return false;
        if (size.width < 0 || size.height < 0) return false;
        if (size.width === 0 && size.height === 0) return false;
        return true;
    }

    // refreshCells gives us the functionality to keep visible islands on
    // the grid, and remove islands from the grid that are no longer visible
    const refreshCells = (): void => {
        for (let i = 0; i < map.length; ++i) {
            for (let ii = 0; i < map[0].length; ++ii) {
                let point: MapPoint = { x: ii, y: i };
                // If the island is not within the boundaries, get rid of it
                if (map[i][ii] === true && !pointWithinBoundary(point, mapBoundary)) {
                    // Remove island outside of new grid dimensions
                    console.log(`Removing point ${{ x: ii, y: i }}`);
                    map[i][ii] = false;
                } // leave the rest alone; they are in scope
            }
        }
    }

    // list of values associated with the provider. like an interface..
    const values: MapProviderValues = {
        getMap,
        getBoundedMap,
        getMapGridSize,
        setMapGridSize,
        getMapBoundary,
        setCell,
        getCell,
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