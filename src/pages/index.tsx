import Cell from "components/cell";
import HomeLayout from "layouts/home"; // effectively getLayout from layouts/home
import { MapBoundary } from "models/map";
import { useMap } from "providers/map-provider";
import { useEffect, useState } from "react";

function HomePage(props: any) {
    const world = useMap();

    useEffect(() => {
        console.log("world has updated!")
    }, [world]);

    const CellMap = () => {
        return world.getMap()?.map((val, i) => {
            return (<div key={`${i}`} className="flex flex-row flex-grow">
                {(() => {
                    return val.map((value, ii) => {
                        return <Cell key={`${ii} ${i}`} onClick={world.setCell} x={ii} y={i} island={value} />
                    })
                })()}
            </div>)
        })
    }

    return (
        <>
            <div className="absolute top-10 right-10 w-10 h-10 bg-yellow-300 shadow-lg">
                
            </div>
            {[...CellMap()]}
        </>
    )
}

HomePage.getLayout = HomeLayout;
export default HomePage;