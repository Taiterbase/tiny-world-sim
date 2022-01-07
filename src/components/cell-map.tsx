import { useMap } from "providers/map-provider";
import CellRow from "./cell-row";

// CellMap is a collection of CellRows that complete the 2d grid map
const CellMap = () => {
    const world = useMap();
    const boundary = world.getMapBoundary();
    let cells = [];
    for (let i = boundary.north; i < boundary.south; i++) {
        cells[i] = (
            <div key={`${i}`} className="flex flex-row flex-grow">
                {CellRow(i)}
            </div>)
    }
    return cells;
}

export default CellMap;