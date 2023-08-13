import { FaSearch } from "react-icons/fa"
import "./SearchBar.css"

export default function JumbotronSearchBar() {



    return (
        <>
            <div className="SearchBar">
                <div className="search-bar-container flex justify-center">
                    <div className=" flex items-center justify-center relative">
                        <FaSearch className="search-icon absolute left-10 md:left-6" size={20} fill="white" />
                        <input type="text" className="font-bold text-xl outline-none py-6 px-16 rounded-lg w-[90%] md:w-[560px] h-[30px] md:h-[64px] placeholder:text-white placeholder:text-[0px] md:placeholder:text-lg" placeholder="What do you want to see live?" />
                    </div>
                </div>
            </div>
        </>
    )
}