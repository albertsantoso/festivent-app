import axios from "axios";
import { toast } from "react-hot-toast";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    username: "",
    email: "",
    fullname: "",
    points: 0
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEmail: (initialState, action) => {
            // console.log(action);
            initialState.email = action.payload;
        },
        setFullname: (initialState, action) => {
            initialState.fullname = action.payload;
        },
        setPoints: (initialState, action) => {
            initialState.points = action.payload
        }
    },
});

export const onLogin = (email, password) => async (dispatch) => {

    const res = await axios.get(`http://localhost:5000/users?email=${email}`);
    console.log("🚀 ~ file: index.js:28 ~ onLogin ~ res:", res)
    if (email !== "" && password !== "") {
        if (res.data.length === 0) {
            return toast.error("Email not registered!");
        }
        const data = res.data;
        if (res.data.length && password !== data[0].password) {
            return toast.error("Wrong password!");
        }
    } else {
        return toast.error("Provide something!")
    }
    toast.success("Login successful!");

    localStorage.setItem("idLogin", res.data[0].id);
    setTimeout(() => {
        dispatch(setEmail(res.data[0].email));
        dispatch(setFullname(res.data[0].fullname));
        dispatch(setPoints(res.data[0].ref_points))
        // navigate("/");
    }, 1000);
};

export const checkLogin = () => async (dispatch) => {
    try {
        const id = localStorage.getItem("idLogin");
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        dispatch(setEmail(res.data.email));
        dispatch(setFullname(res.data.fullname));
    } catch (error) {
        console.log(error);
    }
};

export const onLogout = () => async (dispatch) => {
    try {
        localStorage.removeItem("idLogin");
        const res = "";
        dispatch(setEmail(res));
        dispatch(setFullname(res));
    } catch (error) {
        console.log(error);
    }
};



export const { setEmail, setFullname, setPoints } = userSlice.actions;
export default userSlice.reducer;
