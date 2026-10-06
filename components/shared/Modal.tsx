'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  overlayVariants,
  modalVariants,
  bottomSheetVariants,
} from '@/lib/animationVariants';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ModalProps {
  isOpen:    boolean;
  onClose:   () => void;
  children:  React.ReactNode;
  /** Optional heading rendered in the modal header */
  title?:    string;
  /** Extra classes applied to the inner dialog panel */
  className?: string;
}

// ─── Focus-trap hook ─────────────────────────────────────────────────────────

/** Focusable element selectors per WAI-ARIA Dialog pattern */
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Traps keyboard focus within `containerRef` while the modal is open.
 * Tab advances, Shift+Tab reverses; Escape fires `onClose`.
 */
function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    /** Move focus into the first focusable element on open */
    const focusFirst = () => {
      const el = containerRef.current;
      if (!el) return;
      const focusable = el.querySelectorAll<HTMLElement>(FOCUSABLE);
      focusable[0]?.focus();
    };

    // Small delay lets Framer Motion finish its enter animation before focus
    const tid = setTimeout(focusFirst, 80);

    const handleKeyDown = (e: KeyboardEvent) => {
      const el = containerRef.current;
      if (!el) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab — if focus is on first, wrap to last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab — if focus is on last, wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(tid);
      document.removeEventListener('keydown', handleKeyDown);
      // Return focus to the element that triggered the modal
      previouslyFocused?.focus();
    };
  }, [isOpen, containerRef, onClose]);
}

// ─── Modal ───────────────────────────────────────────────────────────────────

/**
 * Base modal used by Room and Dish detail overlays.
 *
 * Layout behaviour:
 *  - Mobile  (< md):  bottom-sheet sliding up from the viewport bottom
 *  - Desktop (≥ md):  centred dialog, max-w-3xl, scrollable content
 *
 * Accessibility:
 *  - role="dialog", aria-modal="true", aria-labelledby (when title provided)
 *  - Focus trap (Tab / Shift+Tab) and Escape-to-close
 *  - Overlay click closes the modal
 *  - Scroll locked on <body> while open
 *
 * Portals to document.body so stacking context is never an issue.
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  className = '',
}: ModalProps) {
  const panelRef  = useRef<HTMLDivElement>(null);
  const titleId   = 'modal-title';

  useFocusTrap(panelRef, isOpen, onClose);

  /** Lock body scroll while open */
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  /** Close when clicking the overlay but NOT when clicking inside the panel */
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Overlay ── */}
          <motion.div
            key="modal-overlay"
            className="fixed inset-0 z-[900]"
            style={{ backgroundColor: 'var(--color-overlay)' }}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            aria-hidden="true"
            onClick={handleOverlayClick}
          />

          {/* ── Mobile bottom-sheet ── */}
          <motion.div
            key="modal-sheet"
            className="
              fixed inset-x-0 bottom-0 z-[901]
              flex flex-col
              rounded-t-2xl overflow-hidden
              md:hidden
            "
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              maxHeight: '92dvh',
            }}
            variants={bottomSheetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            ref={panelRef}
          >
            <ModalInner
              title={title}
              titleId={titleId}
              onClose={onClose}
              className={className}
            >
              {children}
            </ModalInner>
          </motion.div>

          {/* ── Desktop centred dialog ── */}
          <div
            key="modal-desktop-wrapper"
            className="
              fixed inset-0 z-[901]
              hidden md:flex
              items-center justify-center
              p-6
            "
            onClick={handleOverlayClick}
          >
            <motion.div
              className={[
                'relative w-full max-w-3xl flex flex-col rounded-lg overflow-hidden',
                'max-h-[90dvh]',
                className,
              ]
                .filter(Boolean)
                .join(' ')}
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                boxShadow:       'var(--shadow-modal)',
              }}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? titleId : undefined}
              ref={panelRef}
              // Prevent overlay-click from reaching the overlay through the panel
              onClick={(e) => e.stopPropagation()}
            >
              <ModalInner
                title={title}
                titleId={titleId}
                onClose={onClose}
                className=""
              >
                {children}
              </ModalInner>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ─── Inner layout (shared between mobile + desktop) ──────────────────────────

interface ModalInnerProps {
  title?:    string;
  titleId:   string;
  onClose:   () => void;
  children:  React.ReactNode;
  className: string;
}

function ModalInner({ title, titleId, onClose, children }: ModalInnerProps) {
  return (
    <>
      {/* Header */}
      <div
        className="flex shrink-0 items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        {title ? (
          <h2
            id={titleId}
            className="font-display text-xl font-semibold leading-snug"
            style={{
              color:      'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            {title}
          </h2>
        ) : (
          /* Spacer keeps the close button right-aligned even without a title */
          <span aria-hidden="true" />
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="
            ml-4 flex h-9 w-9 shrink-0 items-center justify-center
            rounded-full transition-colors duration-[var(--duration-fast)]
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[var(--color-accent)]
          "
          style={{
            color:           'var(--color-text-muted)',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              'var(--color-bg-card)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              'transparent';
          }}
        >
          <X size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {/* Scrollable content area */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {children}
      </div>
    </>
  );
}
