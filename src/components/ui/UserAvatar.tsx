interface UserAvatarProps {
  name: string;
  className?: string;
}

const UserAvatar = ({ name, className }: UserAvatarProps) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className={`rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold ${className}`}>
      {initial}
    </div>
  );
};

export default UserAvatar;
