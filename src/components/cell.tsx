import { MapPoint } from "models/map";
import React, { memo, useEffect, useState } from "react";

type CellProps = {
    x: number;
    y: number;
    island: boolean;
    onClick: (point: MapPoint) => Promise<void>;
};

const Cell = (props: CellProps) => {
    const { x, y, island = false, onClick } = props;
    const handleOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        onClick({x, y});
    }
    
    useEffect(() => {
        console.log(`Cell ${x}, ${y} was rerendered`)
    })
    
    let bgColor = island ? `bg-yellow-150` : `bg-blue-640`;
    let hoverColor = island ? `bg-blue-640` : `bg-yellow-150`;
    return (<div key={`${x} ${y}`} onClick={(e) => handleOnClick(e)} className={`flex flex-grow ${bgColor} hover:${hoverColor} hover:shadow-lg`} />);
}

export default memo(Cell, ((prevProps, nextProps) => prevProps.island === nextProps.island));