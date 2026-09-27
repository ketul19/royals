'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { modalVariants, backdropVariants } from '@/lib/animationVariants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  triggerRef?: React.RefObject<HTMLElement>;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  triggerRef,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = React.useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      // Basic focus trap: native dialogs handle focus natively quite well,
      // but we could explicitly focus something if needed.
    } else {
      if (dialog.open) {
        dialog.close();
      }
      // Return focus to trigger
      triggerRef?.current?.focus();
    }
  }, [isOpen, triggerRef]);

  // Handle escape key via native dialog event
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault(); // Prevent native close so we can handle it via state
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <dialog
          ref={dialogRef}
          className="bg-transparent p-0 m-0 w-full h-full max-w-none max-h-none backdrop:bg-transparent"
          onClick={handleBackdropClick}
          aria-labelledby={titleId}
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-black/60 pointer-events-auto"
              onClick={onClose}
              aria-hidden="true"
            />
            
            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-2xl bg-[var(--bg)] text-[var(--fg)] rounded-t-[1.5rem] sm:rounded-[1.5rem] shadow-xl pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
              role="document"
            >
              <div className="sr-only" id={titleId}>{title}</div>
              {children}
            </motion.div>
          </div>
        </dialog>
      )}
    </AnimatePresence>
  );
};
