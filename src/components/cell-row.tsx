import { useMap } from "providers/map-provider";
import Cell from "./cell";

// CellRow is a row of cells on the 2d grid map
const CellRow = (row: number): React.ReactNode => {
    const world = useMap();
    const boundary = world.getMapBoundary();
    console.log(boundary);
    let cellRow = [];
    for (let ii = boundary.west; ii < boundary.east; ii++) {
        let island = world.getCell({ x: ii, y: row });
        cellRow[ii] = <Cell key={`${ii} ${row}`} x={ii} y={row} island={island} />
    }
    return cellRow;
}

export default CellRow;