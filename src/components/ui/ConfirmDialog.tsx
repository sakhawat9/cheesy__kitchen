import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { BiErrorCircle } from "react-icons/bi";
import Button from "./Button";

/**
 * Confirmation modal for destructive admin actions, replacing the sweetalert2
 * confirm popups scattered through the manage screens. Headless UI (already a
 * dependency) handles the focus trap, Escape-to-close and aria-modal wiring.
 */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  destructive = true,
}: any) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={loading ? () => {} : onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-charcoal-950/60" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md p-6 bg-white rounded-card shadow-popover">
              <div className="flex gap-4">
                {destructive && (
                  <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-danger-soft text-danger">
                    <BiErrorCircle className="w-5 h-5" aria-hidden="true" />
                  </span>
                )}
                <div className="flex-1">
                  <DialogTitle className="mb-1 font-bold text-h4 font-heading text-charcoal-900">
                    {title}
                  </DialogTitle>
                  {description && (
                    <p className="text-sm text-charcoal-500">{description}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end">
                <Button variant="outline" onClick={onClose} disabled={loading}>
                  {cancelLabel}
                </Button>
                <Button
                  variant={destructive ? "danger" : "primary"}
                  onClick={onConfirm}
                  loading={loading}
                >
                  {confirmLabel}
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
