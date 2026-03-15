interface UserInfoFieldProps {
  label: string;
  value: string;
  className?: string;
}

const UserInfoField = ({ label, value, className = "" }: UserInfoFieldProps) => {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <span className="text-zinc-500 font-medium">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
};

export default UserInfoField;
