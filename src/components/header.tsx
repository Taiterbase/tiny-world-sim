import MapSizeForm from "./map-size-form"
import MapStats from "./map-stats";

// Header is the top UI element on the home page that houses the map
// statistics and map size form
const Header = () => {
    return (
        <div className="p-6 right-1 top-0 flex flex-row flex-shrink-0 bg-slate-800">
            <MapStats />
            <MapSizeForm />
        </div>
    )
}

export default Header;