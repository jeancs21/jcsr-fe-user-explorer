import type { User } from "../interface/user.interface";
import Button from "../../../components/ui/Button";
import UserAvatar from "../../../components/ui/UserAvatar";
import UserInfoField from "./UserInfoField";

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailModal = ({ user, isOpen, onClose }: UserDetailModalProps) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-semibold">User Details</h3>
          <Button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex flex-col items-center mb-6">
            <UserAvatar name={user.name} className="w-20 h-20 text-2xl mb-2" />
            <h4 className="text-xl font-bold">{user.name}</h4>
            <p className="text-zinc-500 text-sm">ID: #{user.id}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm">
            {[
              { label: "Email", value: user.email },
              { label: "Phone", value: user.phone },
              { label: "Company", value: user.company },
              { label: "City", value: user.city },
            ].map((field) => (
              <UserInfoField key={field.label} label={field.label} value={field.value} />
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 flex justify-end">
          <Button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
