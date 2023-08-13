import { Link } from "react-router-dom"
import "./CategoryCard.css"

export default function CategoryCard({ eventCategoryName }) {
    return (
        <>
            <Link to={`/`}>
                <div className="CategoryCard">
                    <div className="category-card-container flex justify-center bg-gradient-to-r from-pink-50 to-green-50 border-2 rounded-lg hover:scale-105 hover:drop-shadow-md duration-150 ease-in-out h-16 p-6">
                        <div className="card-wrapper flex justify-center items-center ">
                            <h3 className="card-title font-semibold text-l">{eventCategoryName}</h3>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}