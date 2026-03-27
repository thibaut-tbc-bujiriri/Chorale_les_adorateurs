import { X } from "lucide-react";
import { type PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-soft dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
