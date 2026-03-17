import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../router/routes.enum";

interface GoBackLinkProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
}

const GoBackLink = ({ children, className, to = AppRoutes.HOME }: GoBackLinkProps) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 ${className || ""}`}
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {children}
    </Link>
  );
};

export default GoBackLink;
