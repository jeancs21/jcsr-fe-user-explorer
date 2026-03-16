import { Link } from "react-router-dom";
import { AppRoutes } from "../../router/routes.enum";

interface GoBackLinkProps {
    children: React.ReactNode;
    className?: string;
}

const GoBackLink = ({ children, className }: GoBackLinkProps) => {
  return (
    <Link
        to={AppRoutes.HOME}
        className={`${className || ""} px-6 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm`}
    >
        {children}
    </Link>
  )
}

export default GoBackLink