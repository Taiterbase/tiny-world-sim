import { Map, MapBoundary, MapPoint, MapProviderValues, MapSize } from "models";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { calculateMapBoundary, generateBoundedMap, generateMap, getIslands, getLands, isValidSize, MAX_HEIGHT, MAX_WIDTH, pointWithinBoundary } from "utilities";
import axios from "axios";

export const MapContext = createContext<MapProviderValues>(null);

// MapProvider offers an interface for the grid of cells on the map
export function MapProvider(props: { children: ReactNode }) {
    const { children } = props;
    const [mapSize, setMapSize] = useState<MapSize>({ height: MAX_HEIGHT, width: MAX_WIDTH });
    const [mapBoundary, setMapBoundary] = useState<MapBoundary>({ north: 0, east: 0, south: 0, west: 0 });
    const [map, setMap] = useState<Map>((() => {
        let arr: boolean[][] = [];
        for (let i = 0; i < MAX_HEIGHT; i++) {
            arr[i] = [];
            for (let ii = 0; ii < MAX_WIDTH; ii++) {
                arr[i][ii] = false;
            }
        }
        return arr;
    })());
    const [loading, setLoading] = useState(true);

    // useEffect[] fetches data and initializes values
    useEffect(() => {
        (async () => await axios.get("https://www.reddit.com/r/bitcoin.json")
            .then(data => data.data).then(async (data) => {
                data = data.data;
                return data.children;
            }).then(async (data) => {
                const height = data.length;
                const width = data[0].data.id.length;
                const boundary = calculateMapBoundary(map.length, map[0].length, { height: data.length, width: data[0].data.id.length });
                let vowelsAndNumbers = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'e', 'i', 'o', 'u']);
                let newMap = [...map];
                for (let i = boundary.north; i < boundary.south; i++) {
                    newMap[i] = [];
                    let id = data[i - boundary.north].data.id.split("");
                    for (let ii = boundary.west; ii < boundary.east; ii++) {
                        let island = !vowelsAndNumbers.has(id[ii - boundary.west]);
                        console.log(island);
                        newMap[i][ii] = island;
                    }
                }
                setMap(newMap);
                setMapBoundary(boundary);
                setMapGridSize({ height, width });
            })
            .catch(err => { console.error(err) })
        )().then(() => setLoading(false));
    }, []);

    // useEffect[mapSize] resets map boundaries after a mapSize change
    useEffect(() => {
        if (map)
            setMapBoundary(calculateMapBoundary(map.length, map[0].length, mapSize));
    }, [mapSize]);

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
        return mapSize;
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
        if (!map) return;
        if (!mapBoundary) return calculateMapBoundary(map.length, map[0].length, mapSize);
        return mapBoundary;
    }

    // getCell returns the value at `Point`.
    const getCell = (point: MapPoint): boolean => {
        if (!map) return false;
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
        map,
        mapBoundary,
        mapSize,
        loading,
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