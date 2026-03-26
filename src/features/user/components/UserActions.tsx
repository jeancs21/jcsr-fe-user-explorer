import { Link } from "react-router-dom";
import type { User } from "../interface/user.interface";
import Button from "../../../components/ui/Button";
import { AppRoutes } from "../../../router/routes.enum";

interface UserActionsProps {
  user: User;
  onShowDetails: (user: User) => void;
  onDelete: (user: User) => void;
  isMobile?: boolean;
}

const UserActions = ({ user, onShowDetails, onDelete, isMobile = false }: UserActionsProps) => {
  
  const editUrl = AppRoutes.EDIT_USER.replace(":id", user.id.toString());

  if (isMobile) {
    return (
      <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between gap-2">
        <Button
          type="button"
          onClick={() => onShowDetails(user)}
          className="flex-1 px-3 py-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium transition-colors"
        >
          View
        </Button>
        <Link
          to={editUrl}
          className="flex-1 flex items-center justify-center px-3 py-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg text-sm font-medium transition-colors"
        >
          Edit
        </Link>
        <Button
          type="button"
          onClick={() => onDelete(user)}
          className="flex-1 px-3 py-2 text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-sm font-medium transition-colors"
        >
          Delete
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-end space-x-2">
      <Button
        type="button"
        onClick={() => onShowDetails(user)}
        className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </Button>
      <Link
        to={editUrl}
        className="inline-block p-2 text-zinc-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
        title="Edit user"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </Link>
      <Button
        type="button"
        onClick={() => onDelete(user)}
        className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </Button>
    </div>
  );
};

export default UserActions;