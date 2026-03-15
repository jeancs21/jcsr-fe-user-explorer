import { createBrowserRouter } from "react-router-dom";
import UserListPage from "../pages/UserListPage";
import CreateUserPage from "../pages/CreateUserPage";
import EditUserPage from "../pages/EditUserPage";
import MainLayout from "../components/common/layout/MainLayout";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <UserListPage />
            },
            {
                path: "create-user",
                element: <CreateUserPage />
            },
            {
                path: "edit-user/:id",
                element: <EditUserPage />
            }
        ]
    }
])