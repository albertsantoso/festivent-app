import { PiCaretDownBold } from "react-icons/pi"
import { useEffect, useState } from "react";
import "./DropdownNavbarMenu.css"
import axios from "axios";

export default function DropdownNavbarMenu(props) {
    const [categories, setCategories] = useState(null)

    const getEventCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/event_categories");
            setCategories(data);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        getEventCategories()
    }, [])

    return (
        <>
            <div className="DropdownNavbarMenu">
                <div className="dropdown-toggle flex items-center gap-2 cursor-pointer">
                    <span className="font-semibold ">{props.menuTitle}</span>
                    <PiCaretDownBold />
                    <div className="menu-dropdown">
                        <ul className="bg-white grid grid-cols-2 p-2 gap-x-1 rounded-lg">
                            {
                                categories?.map((category) => {
                                    return (
                                        <>
                                            <li className="hover:bg-neutral-100 py-4 rounded-lg"><a href={`/${category.id}`} className="font-semibold">{category.name}</a></li>
                                        </>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}