"use client";

import { closeModal, openModal } from "@/redux/features/modalSlice";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const DealModal = () => {
  const isOpen = useSelector((state) => state.deal_modal.isOpen);
  const dispatch = useDispatch();
  const dialogueRef = useRef(null);

  useEffect(() => {
    const dialog = dialogueRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);


  return (
    <>
      <p onClick={() => dispatch(openModal())}>Open</p>
      <dialog
        ref={dialogueRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => dispatch(closeModal())} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DealModal;
