import { Map, MapBoundary, MapPoint, MapProviderValues, MapSize } from "models";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { calculateMapBoundary, generateBoundedMap, generateMap, getIslands, getLands, isValidSize, MAX_HEIGHT, MAX_WIDTH, pointWithinBoundary } from "utilities";


export const MapContext = createContext<MapProviderValues>(null);

// MapProvider offers an interface for the grid of cells on the map
export function MapProvider(props: { children: ReactNode }) {
    const { children } = props;
    const [mapSize, setMapSize] = useState<MapSize>({ height: 20, width: 40 });
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
            let arr = generateMap();
            return resolve(arr);
        });
    }

    // getMap returns the raw boolean[][]
    const getMap = (): Map => {
        return map;
    }

    // getBoundedMap returns the bounded map area
    const getBoundedMap = (): Map => {
        const boundary = getMapBoundary();
        return generateBoundedMap(boundary, map);
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
            if (isValidSize(size)) return resolve(setMapSize(size));
            return reject(`Dimensions are out of bounds. Please submit a map size between a 2 x 2 and ${MAX_WIDTH} x ${MAX_HEIGHT} rectangle.`);
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
        return getLands(boundary, map);
    }

    const getNumberOfIslands = (): number => {
        const boundary = getMapBoundary();
        return getIslands(boundary, map);
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