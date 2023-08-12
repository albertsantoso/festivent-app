import { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard";
import SectionHeading from "../SectionHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CategorySection() {
    const [eventCategories, setEventCategories] = useState(null);

    const getEvents = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/event_categories"
            );
            // console.log(data);
            setEventCategories(data);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    const navigate = useNavigate();
    const onClickCategories = () => {};

    return (
        <>
            <section className="mycontainer">
                <SectionHeading sectionTitle="Trending Categories" />

                <div className="tile-group grid grid-cols-2 md:grid-cols-4 gap-[12px] ">
                    {eventCategories?.map((eventCategory, index) => {
                        return (
                            <>
                                <CategoryCard
                                    key={index}
                                    eventCategoryName={eventCategory.name}
                                />
                            </>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
