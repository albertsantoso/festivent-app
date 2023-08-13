import axios from "axios";
import { useEffect, useRef, useState } from "react";
import EventCard from "../../Components/EventCard";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function AllEventsPageFiltering() {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState(null);
    const [cities, setCities] = useState(null);
    const [filters, setFilters] = useState([0, 0, ""]);
    const [filtersChanged, setFiltersChanged] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const inputFilter1 = useRef();
    const inputFilter2 = useRef();
    const inputFilter3 = useRef();

    const onFetchEvents = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/events`);
            setEvents(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getEventCategories = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/event_categories");
            setCategories(data);
        } catch (error) {
            alert(error);
        }
    };

    const getCities = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/event_cities");
            setCities(data);
        } catch (error) {
            alert(error);
        }
    };

    const onFilterCategories = (id) => {
        const temp = [...filters];
        temp.splice(0, 1, Number(id));
        setFilters(temp);
        setFiltersChanged(true);
    };
    const onFilterCities = (id) => {
        const temp = [...filters];
        temp.splice(1, 1, Number(id));
        setFilters(temp);
        setFiltersChanged(true);
    };

    const onSearch = (text) => {
        const temp = [...filters];
        temp.splice(2, 1, String(text));
        setFilters(temp);
        setFiltersChanged(true);
    };

    const onClear = () => {
        window.location.reload(false);
    };

    useEffect(() => {
        onFetchEvents();
        getEventCategories();
        getCities();
    }, []);

    useEffect(() => {
        // console.log(filters);
        if (filters[0]) {
            const dataFull = [...events];
            const temp1 = dataFull.filter((v) => {
                return v.event_category === filters[0];
            });
            if (filters[1]) {
                if (filters[2]) {
                    const temp2 = temp1.filter((v) => {
                        return v.city === filters[1];
                    });
                    const temp3 = temp2.filter((v) => {
                        return v.title.toLowerCase().includes(filters[2].toLowerCase());
                    });
                    return setFilteredData(temp3);
                }
                const temp2 = temp1.filter((v) => {
                    return v.city === filters[1];
                });
                return setFilteredData(temp2);
            }
            if (filters[2]) {
                const temp2 = temp1.filter((v) => {
                    return v.title.toLowerCase().includes(filters[2].toLowerCase());
                });
                return setFilteredData(temp2);
            }
            return setFilteredData(temp1);
        }
        if (filters[1]) {
            const dataFull = [...events];
            const temp1 = dataFull.filter((v) => {
                return v.city === filters[1];
            });
            if (filters[0]) {
                if (filters[2]) {
                    const temp2 = temp1.filter((v) => {
                        return v.event_category === filters[0];
                    });
                    const temp3 = temp2.filter((v) => {
                        return v.title.toLowerCase().includes(filters[2].toLowerCase());
                    });
                    return setFilteredData(temp3);
                }
                const temp2 = temp1.filter((v) => {
                    return v.event_category === filters[0];
                });
                return setFilteredData(temp2);
            }
            if (filters[2]) {
                const temp2 = temp1.filter((v) => {
                    return v.title.toLowerCase().includes(filters[2].toLowerCase());
                });
                return setFilteredData(temp2);
            }
            return setFilteredData(temp1);
        }
        if (filters[2]) {
            const dataFull = [...events];
            const temp1 = dataFull.filter((v) => {
                return v.title.toLowerCase().includes(filters[2].toLowerCase());
            });
            if (filters[0]) {
                if (filters[1]) {
                    const temp2 = temp1.filter((v) => {
                        return v.event_category === filters[0];
                    });
                    const temp3 = temp2.filter((v) => {
                        return v.city === filters[1];
                    });
                    return setFilteredData(temp3);
                }
                const temp2 = temp1.filter((v) => {
                    return v.event_category === filters[0];
                });
                return setFilteredData(temp2);
            }
            if (filters[1]) {
                const temp2 = temp1.filter((v) => {
                    return v.city === filters[1];
                });
                return setFilteredData(temp2);
            }
            return setFilteredData(temp1);
        }
    }, [filters]);

    return (
        <>
            <div className="EventsFilteringPage">
                <div className="filtering-page-container py-[84px] md:py-[140px] ">
                    <div className="filtering-page-wrapper md:px-[30px] md:mx-auto md:max-w-[1300px] px-6">
                        <div className="section-header mb-4 md:mb-8">
                            <h1 className="font-bold ff-space-g text-4xl md:text-6xl text-left">Explore events</h1>
                        </div>
                        <section className="section-filters-container grid grid-rows-2 grid-cols-6 md:flex gap-2 mb-8">
                            <div className="filter-group category-filter col-span-3">
                                <select
                                    onChange={() => onFilterCategories(inputFilter1.current.value)}
                                    name="city"
                                    id="city"
                                    className="rounded-lg w-full text-sm truncate md:text-base md:w-[220px] font-semibold border-2 border-neutral-300 py-4 cursor-pointer hover:bg-neutral-50"
                                    ref={inputFilter1}
                                >
                                    <option value="" disabled selected>
                                        Select category
                                    </option>
                                    {categories?.map((value) => {
                                        return (
                                            <>
                                                <option value={value.id} key={value.id}>
                                                    {value.name}
                                                </option>
                                            </>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="filter-group city-filter col-span-3">
                                <select
                                    onChange={() => onFilterCities(inputFilter2.current.value)}
                                    name="city"
                                    id="city"
                                    className="rounded-lg w-full text-sm truncate md:text-base md:w-[220px] font-semibold border-2 border-neutral-300 py-4 cursor-pointer hover:bg-neutral-50"
                                    ref={inputFilter2}
                                >
                                    <option value="" disabled selected>
                                        Select city
                                    </option>
                                    {cities?.map((value) => {
                                        return (
                                            <>
                                                <option value={value.id} key={value.id}>
                                                    {value.name}
                                                </option>
                                            </>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="filter-group search-filter w-full relative flex items-center col-span-5">
                                <FaSearch className="absolute left-[18px]" size={20} />
                                <input
                                    onChange={() => onSearch(inputFilter3.current.value)}
                                    type="text"
                                    className="w-full rounded-lg text-xl pl-12 font-semibold border-2 border-neutral-300 h-full"
                                    ref={inputFilter3}
                                />
                            </div>
                            <div className="">
                                <button onClick={() => onClear()} className="rounded-lg font-medium border-2 md:block hidden border-neutral-300 h-full w-[120px] hover:bg-neutral-50 active:bg-neutral-100">
                                    Clear Filter
                                </button>
                                <button onClick={() => onClear()} className="rounded-lg text-[40px] flex items-center justify-center font-medium md:hidden border-neutral-300 h-full w-full hover:text-[44px] active:text-[38px] duration-150">
                                    <ion-icon name="refresh-circle"></ion-icon>
                                </button>
                            </div>
                        </section>
                        <section className="feed-events-container">
                            <div className="feed-events-wrapper grid gap-6 md:grid-cols-4">
                                {filteredData.length === 0 && !filtersChanged
                                    ? events?.map((event) => {
                                        const date = new Date(event.datetime_start[0]);
                                        const dayMonthDate = date.toLocaleDateString(undefined, {
                                            weekday: "short",
                                            month: "long",
                                            day: "numeric",
                                        });

                                        return (
                                            <>
                                                <Link to={`/event/${event.id}`}>
                                                    <EventCard
                                                        key={event.id}
                                                        image={event.image}
                                                        title={`${event.title}`}
                                                        dateTime={dayMonthDate}
                                                        venue={`${event.location}`}
                                                        price={
                                                            event.price === 0
                                                                ? "Free"
                                                                : `${event.price.toLocaleString("id-ID", {
                                                                    style: "currency",
                                                                    currency: "IDR",
                                                                    minimumFractionDigits: 0,
                                                                })}`
                                                        }
                                                    />
                                                </Link>
                                            </>
                                        );
                                    })
                                    : filteredData?.map((event) => {
                                        const date = new Date(event.datetime_start[0]);
                                        const dayMonthDate = date.toLocaleDateString(undefined, {
                                            weekday: "short",
                                            month: "long",
                                            day: "numeric",
                                        });

                                        return (
                                            <>
                                                <Link to={`/event/${event.id}`}>
                                                    <EventCard
                                                        key={event.id}
                                                        image={event.image}
                                                        title={`${event.title}`}
                                                        dateTime={dayMonthDate}
                                                        venue={`${event.location}`}
                                                        price={
                                                            event.price === 0
                                                                ? "Free"
                                                                : `${event.price.toLocaleString("id-ID", {
                                                                    style: "currency",
                                                                    currency: "IDR",
                                                                    minimumFractionDigits: 0,
                                                                })}`
                                                        }
                                                    />
                                                </Link>
                                            </>
                                        );
                                    })}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
