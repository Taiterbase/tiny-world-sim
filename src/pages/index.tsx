import CellMap from "components/cell-map";
import Header from "components/header";
import HomeLayout from "layouts/home"; // getLayout fn from layouts/home

function HomePage(props: any) {
    return (
        <>
            <Header />
            {CellMap()}
        </>
    )
}

HomePage.getLayout = HomeLayout;
export default HomePage;