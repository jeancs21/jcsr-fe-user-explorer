import { createBrowserRouter } from "react-router-dom";
import UserListPage from "../pages/UserListPage";
import CreateUserPage from "../pages/CreateUserPage";
import UserDetailPage from "../pages/UserDetailPage";
import EditUserPage from "../pages/EditUserPage";
import NotFoundPage from "../pages/NotFoundPage";
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
                path: AppRoutes.USER_DETAILS.replace("/", ""),
                element: <UserDetailPage />
            },
            {
                path: AppRoutes.CREATE_USER.replace("/", ""),
                element: <CreateUserPage />
            },
            {
                path: AppRoutes.EDIT_USER.replace("/", ""),
                element: <EditUserPage />
            },
            {
                path: AppRoutes.NOT_FOUND,
                element: <NotFoundPage />
            }
        ]
    }
])