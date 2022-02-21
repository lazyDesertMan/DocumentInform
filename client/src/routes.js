import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Document from "./pages/Document";
import { ERROR_ROUTE, COMPLETED_ROUTE, DOCUMENT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, TASKS_ROUTE, PDF_ROUTE, OPTIONS_ROUTE } from "./utils/consts";
import Home from "./pages/Home";
import Completed from "./pages/Completed";
import Tasks from "./pages/Tasks";
import Error from "./pages/Error";
import PDF from "./pages/PDF"
import Options from "./pages/Options"

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
    {
        path: TASKS_ROUTE ,
        Component: Tasks
    },
    {
        path: PDF_ROUTE + '/:id' ,
        Component: PDF
    },
    {
        path: PDF_ROUTE + '/:id/:taskID' ,
        Component: PDF
    },
    {
        path: OPTIONS_ROUTE ,
        Component: Options
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
    {
        path: TASKS_ROUTE ,
        Component: Tasks
    },
    {
        path: PDF_ROUTE + '/:id' ,
        Component: PDF
    },
    {
        path: OPTIONS_ROUTE ,
        Component: Options
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
]