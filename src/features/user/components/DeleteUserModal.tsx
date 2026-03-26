import type { User } from '../interface/user.interface';
import Button from '../../../components/ui/Button';
import { useDeleteUser } from '../hooks/useDeleteUser';

interface DeleteUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

const DeleteUserModal = ({ user, isOpen, onClose, onDeleted }: DeleteUserModalProps) => {
  const { handleDeleteUser, isDeleting } = useDeleteUser();

  if (!isOpen || !user) return null;

  const onConfirmDelete = async () => {
    const success = await handleDeleteUser(user.id);
    if (success) {
      onDeleted();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-center mb-2">Eliminar Usuario</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-center mb-6">
            ¿Estás seguro de que deseas eliminar al usuario <span className="font-semibold text-zinc-900 dark:text-zinc-100">"{user.name}"</span> (ID: {user.id})? Esta acción no se puede deshacer.
          </p>

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={onConfirmDelete}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;