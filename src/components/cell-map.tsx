import { useMap } from "providers/map-provider";
import CellRow from "./cell-row";

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