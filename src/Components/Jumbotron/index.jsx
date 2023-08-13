import HandTag from "../HandTag"
import JumbotronSearchBar from "../JumbotronSearchBar"
import "./Jumbotron.css"

export default function Jumbotron() {
    return (
        <>
            <div className="Jumbotron">
                <div className="jumbotron-container bg-gradient-animation-1 flex flex-col items-center pb-8 pt-[90px] md:pb-[70px] md:pt-[140px] mb-12">
                    <div className="greeter pb-[20px] md:pb-2">
                        <HandTag />
                    </div>

                    <div className="jumbotron-title">
                        <h1 className="font-bold leading-[1.1] text-[36px] px-2 md:px-6 md:text-[80px] max-w-full md:max-w-[1200px] md:m-auto text-white [text-shadow:_0_0_10px_rgb(0_0_0_/_60%)]">The modern event platform, built for event people.</h1>
                    </div>

                    <div className="jumbotron-subhead">
                        <p className="font-medium text-base md:text-xl text-white [text-shadow:_0_0_10px_rgb(0_0_0_/_60%)] my-auto mb-6 md:mb-10 mt-[18px] md:mt-[30px]">Your next best-night-ever is waiting. <br /> And we have the tickets.</p>
                    </div>
                    <div className="md:px-0 px-2">
                        <JumbotronSearchBar />
                    </div>
                </div>
            </div>
        </>
    )
}