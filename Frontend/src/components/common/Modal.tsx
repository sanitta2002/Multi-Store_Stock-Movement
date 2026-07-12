import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-slate-900/40 backdrop-blur-md"
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

        <div className="inline-block transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle border border-gray-100 animate-modal-in">
          <div className="bg-white px-6 pt-6 pb-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="text-sm text-gray-700">{children}</div>
          </div>
          {footer && (
            <div className="bg-gray-50/80 backdrop-blur px-6 py-4 sm:flex sm:flex-row-reverse border-t border-gray-100">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
