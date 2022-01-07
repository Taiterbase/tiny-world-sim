export type Map = boolean[][];

export type MapPoint = {
    x: number;
    y: number;
}

export type MapSize = {
    width: number;
    height: number;
}

export type MapBoundary = {
    north: number;
    east: number;
    south: number;
    west: number;
}

export type MapProviderValues = {
    getMap: () => Map;
    getBoundedMap: () => Map;
    getMapGridSize: () => MapSize;
    setMapGridSize: (size: MapSize) => Promise<void>;
    getMapBoundary: () => MapBoundary;
    setCell: (cell: MapPoint) => Promise<void>;
    getCell: (point: MapPoint) => boolean;
    getNumberOfIslands: () => number;
    getNumberOfLands: () => number;
};
