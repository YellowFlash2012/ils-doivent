import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";

import App from "./App.jsx";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Home from "../pages/Home.jsx";
import PrivateRoutes from "../components/PrivateRoutes.jsx";
import AdminRoutes from "../components/AdminRoutes.jsx";
import Profile from "../pages/Profile.jsx";
import SchoolsList from "../pages/SchoolsList.jsx";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "../app/store.js";
import Student from "../pages/Student.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<Home />} />

            {/* search route */}
            <Route path="/search/:keyword" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="" element={<PrivateRoutes />}>
                <Route path="/profile" element={<Profile />} />

                <Route path="/students/:id" element={<Student />} />
            </Route>

            <Route path="" element={<AdminRoutes />}>
                <Route path="/admin/register" element={<Register />} />

                <Route index={true} path="/admin" element={<SchoolsList />} />
            </Route>
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
