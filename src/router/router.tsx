import { createBrowserRouter } from "react-router-dom";
import UserListPage from "../pages/UserListPage";
import CreateUserPage from "../pages/CreateUserPage";
import EditUserPage from "../pages/EditUserPage";
import MainLayout from "../components/common/layout/MainLayout";
import { AppRoutes } from "./routes.enum";

export const router = createBrowserRouter([
    {
        path: AppRoutes.HOME,
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <UserListPage />
            },
            {
                path: AppRoutes.CREATE_USER.replace("/", ""),
                element: <CreateUserPage />
            },
            {
                path: AppRoutes.EDIT_USER.replace("/", ""),
                element: <EditUserPage />
            }
        ]
    }
])