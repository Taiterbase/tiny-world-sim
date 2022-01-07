import { MapBoundary, MapPoint, MapSize } from "models/map";

export const MAX_HEIGHT = 100;
export const MAX_WIDTH = 100;

export const calculateMapBoundary = (mapY: number = MAX_HEIGHT, mapX: number = MAX_WIDTH, size: MapSize): MapBoundary => {
    // calculate virtual boundaries
    const height_diff = mapY - size.height;
    const width_diff = mapX - size.width;
    // grab the offset incase the dimensions are odd
    const height_offset = height_diff % 2;
    const width_offset = width_diff % 2;
    // divide the height and width by 2
    const boundaryY = height_diff / 2;
    const boundaryX = width_diff / 2;
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

export const pointWithinBoundary = (point: MapPoint, boundary: MapBoundary): boolean => {
    return point.y >= boundary.north &&
        point.y < boundary.south &&
        point.x >= boundary.west &&
        point.x < boundary.east;

}

