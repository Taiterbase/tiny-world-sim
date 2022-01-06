import { useRouter } from 'next/router'
import { useEffect } from "react";
import HomeIcon from "components/home-svg";
import SmileIcon from "components/smile-svg";

export default function HomeHeader(props: any) {
    const router = useRouter();

    useEffect(() => {
        console.log("Mounting dashboard header")
    }, [])

    return (
        <div>
            <div className="ml-12 fixed h-16 max-h-16 min-w-full z-20 flex justify-between border-b-2 border-gray-400 border-opacity-20">
                <div className="flex w-full place-items-center justify-evenly backdrop-filter backdrop-blur-lg">
                    <p className="text-3xl text-slate-600">{`Zifi's Web`}</p>
                </div>
            </div>
            <div key="header" className="z-30 fixed overflow-x-hidden h-full w-20 flex-col justify-around list-content backdrop-filter backdrop-blur-3xl">
                <div className="h-full">
                    <button title="Home" onClick={() => { router.push("/") }} className="w-20 h-16 hover:bg-green-600 hover:bg-opacity-30">
                        <HomeIcon/>
                    </button>
                    <button title="Placeholder" onClick={() => { router.push("/") }} className="w-20 h-16 hover:bg-green-600 hover:bg-opacity-30">
                        <SmileIcon/>
                    </button>
                </div>
            </div>
        </div>
    );
}