import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div
        className={`flex items-start gap-3 p-4 rounded-2xl border shadow-2xl max-w-sm w-full backdrop-blur-xl ${
          isSuccess
            ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-300'
            : 'bg-slate-900/95 border-red-500/40 text-red-300'
        }`}
      >
        <div
          className={`p-2 rounded-xl shrink-0 mt-0.5 ${
            isSuccess ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}
        >
          {isSuccess ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
        </div>

        <div className="flex-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            {isSuccess ? 'Success' : 'Error'}
          </h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
