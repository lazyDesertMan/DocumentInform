import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Document from "./pages/Document";
import { ERROR_ROUTE, COMPLETED_ROUTE, DOCUMENT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, TASKS_ROUTE } from "./utils/consts";
import Home from "./pages/Home";
import Completed from "./pages/Completed";
import Tasks from "./pages/Tasks";
import Error from "./pages/Error";

export const authRoutes = [
    {
        path: PROFILE_ROUTE ,
        Component: Profile
    },
    {
        path: DOCUMENT_ROUTE,
        Component: Document
    },
    {
        path: COMPLETED_ROUTE ,
        Component: Completed
    },
    
    {
        path: HOME_ROUTE ,
        Component: Home
    },
    {
        path: ERROR_ROUTE ,
        Component: Error
    },
]

export const adminRoutes = [
    {
        path: REGISTRATION_ROUTE ,
        Component: Registration
    },
    {
        path: PROFILE_ROUTE ,
        Component: Profile
    },
    {
        path: DOCUMENT_ROUTE,
        Component: Document
    },
    {
        path: COMPLETED_ROUTE ,
        Component: Completed
    },
    {
        path: HOME_ROUTE ,
        Component: Home
    },
    {
        path: ERROR_ROUTE ,
        Component: Error
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE ,
        Component: Login
    },
    {
        path: HOME_ROUTE ,
        Component: Home
    },
    {
        path: ERROR_ROUTE ,
        Component: Error
    },
    {
        path: TASKS_ROUTE ,
        Component: Tasks
    },
    {
        path: PROFILE_ROUTE ,
        Component: Profile
    },
]