import { Map, MapBoundary, MapPoint, MapSize } from "models/map";

export const MAX_HEIGHT = 100;
export const MAX_WIDTH = 100;

// calculateMapBoundary returns the map boundary for the current size.
export const calculateMapBoundary = (mapY: number = MAX_HEIGHT, mapX: number = MAX_WIDTH, size: MapSize): MapBoundary => {
    // calculate virtual boundaries
    const height_diff = mapY - size.height;
    const width_diff = mapX - size.width;
    // grab the offset incase the dimensions are odd
    const height_offset = height_diff % 2;
    const width_offset = width_diff % 2;
    // divide the height and width by 2
    const boundaryY = Math.floor(height_diff / 2);
    const boundaryX = Math.floor(width_diff / 2);
    // add the offset
    const north = boundaryY + height_offset;
    const west = boundaryX + width_offset;
    // subtract total map height to align indices
    const east = mapX - boundaryX;
    const south = mapY - boundaryY;
    return {
        north,
        east,
        south,
        west
    };
}

// pointWithinBoundary returns a boolean specifying if the given cell location is
// within the calculated map boundary
export const pointWithinBoundary = (point: MapPoint, boundary: MapBoundary): boolean => {
    return point.y >= boundary.north &&
        point.y < boundary.south &&
        point.x >= boundary.west &&
        point.x < boundary.east;
}

// generateMap creates the boolean[][] bitmap
export const generateMap = () => {
    let arr: boolean[][] = [];
    for (let i = 0; i < MAX_HEIGHT; i++) {
        arr[i] = [];
        for (let ii = 0; ii < MAX_WIDTH; ii++) {
            arr[i][ii] = false;
        }
    }
    return arr;
}

// generateBoundedMap creates the boolean[][] bitmap for the
// bounded case; preserving the original map
export const generateBoundedMap = (boundary: MapBoundary, map: Map): Map => {
    let boundedMap: boolean[][] = [];
    for (let i = boundary.north; i < boundary.south; i++) {
        boundedMap[i] = [];
        for (let ii = boundary.west; ii < boundary.east; ii++) {
            boundedMap[i][ii] = map[i][ii];
        }
    }
    return map
}


// isValidSize verifies if the parameter is within bounds
export const isValidSize = (size: MapSize) => {
    if (size.height > MAX_HEIGHT) return false;
    if (size.width > MAX_WIDTH) return false;
    if (size.width <= 1 || size.height <= 1) return false;
    if (size.width === 0 && size.height === 0) return false;
    return true;
}

// getLands returns the number of landmarks on the map
export const getLands = (boundary: MapBoundary, map: Map): number => {
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

// getIslands returns the number of islands on the map
export const getIslands = (boundary: MapBoundary, map: Map): number => {
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
