import { type ReactNode, forwardRef } from "react";

type Props = { children: ReactNode; toggleModal: () => void };
const Modal = forwardRef<HTMLDialogElement, Props>(
  ({ children, toggleModal }, ref) => {
    return (
      <dialog
        className="bg-opacity-0 backdrop:backdrop-blur"
        ref={ref}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            toggleModal();
          }
        }}
      >
        <div className="size-full">{children}</div>
      </dialog>
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
