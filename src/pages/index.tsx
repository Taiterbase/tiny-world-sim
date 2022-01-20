import CellMap from "components/cell-map";
import Header from "components/header";
import HomeLayout from "layouts/home"; // getLayout fn from layouts/home
import { useMap } from "providers/map-provider";

function HomePage(props: any) {
    const world = useMap();

    if (world.loading) {
        return (
            <>Loading!</>
        )
    } else {
        return (
            <>
                <Header />
                {CellMap()}
            </>
        )
    }
}

HomePage.getLayout = HomeLayout;
export default HomePage;