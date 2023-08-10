import { FaSearch } from "react-icons/fa"
import "./SearchBar.css"

export default function JumbotronSearchBar() {
    return (
        <>
            <div className="SearchBar">
                <div className="search-bar-container flex justify-center">
                    <div className=" flex items-center relative">
                        <FaSearch className="search-icon absolute left-6" size={20} fill="white" />
                        <input type="text" className="font-bold text-xl py-6 px-16 rounded-lg w-[560px] h-[64px] placeholder:text-white" placeholder="What do you want to see live?" />
                    </div>
                </div>
            </div>
        </>
    )
}