import type { User } from "../interface/user.interface";
import Button from "../../../components/ui/Button";

interface UserActionsProps {
  user: User;
  onShowDetails: (user: User) => void;
  isMobile?: boolean;
}

const UserActions = ({ user, onShowDetails, isMobile = false }: UserActionsProps) => {
  
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
    </div>
  );
};

export default UserActions;
