import HomeLayout from "layouts/home"; // effectively getLayout from layouts/home

function HomePage(props: any) {
    return (
        <div>
            <p>Hey!</p>
        </div>
    )
}

HomePage.getLayout = HomeLayout;
export default HomePage;