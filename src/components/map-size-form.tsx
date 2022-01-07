import { MapSize } from "models/map";
import { useMap } from "providers/map-provider";
import { FormEvent, useState } from "react";
import { MAX_HEIGHT, MAX_WIDTH } from "utilities/map";

// MapSizeForm is the form for adjusting the map size
const MapSizeForm = () => {
    const world = useMap();
    const [mapSize, setMapSize] = useState<MapSize>(world.getMapGridSize())
    const [error, setError] = useState(false);

    const changeMapSize = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        world.setMapGridSize(mapSize).then(() => {
            //we passed
            setError(false);
        }).catch(err => {
            setError(err);
        })
    }

    return (
        <form onSubmit={e => changeMapSize(e)} className="flex flex-col flex-grow">
            <div className="flex justify-end w-full place-items-center">
                <label htmlFor="height-input" className="text-white px-4">Height:</label>
                <input className="p-2 rounded-md" type="number" onChange={e => setMapSize({ ...mapSize, height: e.target.valueAsNumber })} id="height-input" max={MAX_HEIGHT} value={mapSize.height ?? MAX_HEIGHT} />
            </div>
            <div className="flex justify-end my-2 w-full place-items-center">
                <label htmlFor="width-input" className="text-white px-4">Width:</label>
                <input className="p-2 rounded-md" type="number" id="width-input" onChange={e => setMapSize({ ...mapSize, width: e.target.valueAsNumber })} max={MAX_WIDTH} value={mapSize.width ?? MAX_WIDTH} />
            </div>
            {error &&
                <div className="flex justify-end my-2 w-full place-items-end">
                    <p className="w-52 text-red-500">{error}</p>
                </div>
            }
            <button className="place-self-end p-2 my-2 w-48 rounded-md bg-yellow-100" type="submit">
                <p className="text-slate-800">Set Size</p>
            </button>
        </form>
    )
}

export default MapSizeForm;