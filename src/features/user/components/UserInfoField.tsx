interface UserInfoFieldProps {
  label: string;
  value: string;
  className?: string;
  isTableColumn?: boolean;
}

const UserInfoField = ({ label, value, className = "", isTableColumn = false }: UserInfoFieldProps) => {
  if (isTableColumn) {
    return (
      <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 font-medium hidden md:table-cell">
        {value}
      </td>
    );
  }

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <span className="text-zinc-500 font-medium">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
};

export default UserInfoField;
