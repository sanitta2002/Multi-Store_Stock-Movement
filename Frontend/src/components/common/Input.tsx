import React from "react";
import { AlertCircle } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5 tracking-wide">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              block w-full rounded-xl border border-gray-200 shadow-sm px-4 py-2.5 transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm bg-gray-50/50 hover:bg-gray-50
              ${leftIcon ? "pl-11" : ""}
              ${
                error
                  ? "border-red-300 bg-red-50 hover:bg-red-50 text-red-900 placeholder-red-300 focus:ring-red-500/20 focus:border-red-500"
                  : ""
              }
              ${className}
            `}
            {...props}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
