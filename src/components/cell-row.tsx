import { useMap } from "providers/map-provider";
import Cell from "./cell";


const CellRow = (row: number): React.ReactNode => {
    const world = useMap();
    const boundary = world.getMapBoundary();
    let cellRow = [];
    for (let ii = boundary.west; ii < boundary.east; ii++) {
        let island = world.getCell({ x: ii, y: row });
        cellRow[ii] = <Cell key={`${ii} ${row}`} x={ii} y={row} island={island} />
    }
    return cellRow;
}

export default CellRow;