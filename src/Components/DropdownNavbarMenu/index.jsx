import { PiCaretDownBold } from "react-icons/pi"
import "./DropdownNavbarMenu.css"

export default function DropdownNavbarMenu(props) {
    return (
        <>
            <div className="DropdownNavbarMenu">
                <div className="dropdown-toggle flex items-center gap-2">
                    <span className="font-semibold">{props.menuTitle}</span>
                    <PiCaretDownBold />
                    <div className="menu-dropdown">
                        <ul>
                            <li><a href="/sport">Sports</a></li>
                            <li><a href="/music">Music</a></li>
                            <li><a href="/seminar">Seminar</a></li>
                            <li><a href="/art">Art Gallery</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}