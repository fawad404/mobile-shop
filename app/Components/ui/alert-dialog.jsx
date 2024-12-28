'use client'
import { useEffect, useRef } from 'react';

export function AlertDialog({ open, onOpenChange, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="bg-gray-800 text-white p-6 rounded-lg shadow-xl"
      onClose={() => onOpenChange(false)}
    >
      {children}
    </dialog>
  );
}

export function AlertDialogContent({ children }) {
  return <div className="space-y-4">{children}</div>;
}

export function AlertDialogHeader({ children }) {
  return <div className="text-lg font-semibold">{children}</div>;
}

export function AlertDialogTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export function AlertDialogDescription({ children }) {
  return <p className="text-gray-300">{children}</p>;
}

export function AlertDialogFooter({ children }) {
  return <div className="flex justify-end space-x-2 mt-4">{children}</div>;
}

