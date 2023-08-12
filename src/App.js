import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./../src/Components/Navbar";
import Footer from "./../src/Components/Footer";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import EventDetailPage from "./Pages/EventDetailPage";
import CreateEvent from "./Pages/CreateEventPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLogin } from "./Redux/Features/Users";
import AllEventsPageFiltering from "./Pages/AllEventsPageFiltering";

function App() {
    const { pathname } = useLocation();
    const loginSignup = ["/login", "/signup"];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLogin());
    }, []);

    // useEffect(() => {
    //     dispatch(checkLogin());
    // }, [email]);

    return (
        <>
            <div className="App">
                {loginSignup.includes(pathname) ? null : <Navbar />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/event/:id" element={<EventDetailPage />} />
                    <Route path="/create" element={<CreateEvent />} />
                    <Route
                        path="/events"
                        element={<AllEventsPageFiltering />}
                    />
                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;
