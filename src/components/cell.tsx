import { useMap } from "providers/map-provider";

type CellProps = {
    x: number;
    y: number;
    island: boolean;
};

// Cell is a cell on the 2d grid of the map
const Cell = (props: CellProps) => {
    const world = useMap();
    const { x, y, island = false } = props;

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        world.setCell({ x, y });
    }

    let bgColor = ``;
    if(island) bgColor = `bg-green-800`;
    let hover = `hover:bg-green-800`;
    return (<div className={`flex flex-grow ${bgColor} ${hover}`} key={`${x} ${y}`} onClick={handleOnClick} />);
}

export default Cell;