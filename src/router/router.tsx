import { createBrowserRouter } from "react-router-dom";
import UserListPage from "../pages/UserListPage";
import CreateUserPage from "../pages/CreateUserPage";
import EditUserPage from "../pages/EditUserPage";

export const router = createBrowserRouter([
    {
        path:"/",
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