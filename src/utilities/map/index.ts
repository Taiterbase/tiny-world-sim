import { MapBoundary, MapPoint, MapSize } from "models/map";

export const MAX_HEIGHT = 100;
export const MAX_WIDTH = 100;

export const calculateMapBoundary = (size: MapSize): MapBoundary => {
    const height_diff = MAX_HEIGHT - size.height;
    const height_offset = height_diff % 2;
    const width_diff = MAX_WIDTH - size.width;
    const width_offset = width_diff % 2;
    const north = height_diff >> 1 + height_offset;
    const east = width_diff >> 1;
    const south = height_diff >> 1;
    const west = width_diff >> 1 + width_offset;
    return {
        north,
        east,
        south,
        west
    };
}

export const pointWithinBoundary = (point: MapPoint, boundary: MapBoundary): boolean => {
    if (
        point.y > boundary.north ||
        point.x > boundary.east ||
        point.y < boundary.south ||
        point.x < boundary.west
    )
        return false;
    return true;
}