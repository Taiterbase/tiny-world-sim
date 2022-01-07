import { useMap } from "providers/map-provider";
import StatCard from "./stat-card";

// MapStats produces a component that displays all the stats about the map
const MapStats = () => {
    const world = useMap();
    return (
        <div className="flex flex-col space-y-2 flex-grow">
            <StatCard data={world.getNumberOfLands()} label="Landmarks" />
            <StatCard data={world.getNumberOfIslands()} label="Islands" />
        </div>
    )
}

export default MapStats;