"use client";

import { closeModal } from "@/redux/features/modalSlice";
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

  const submitDealForm = (e) => {
    e.preventDefault();
    console.log(e.target);
    dispatch(closeModal());
  };
  return (
    <>
      <dialog
        ref={dialogueRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box p-3">
          <form onSubmit={submitDealForm} method="dialog" className="">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <button className="btn">Submit</button>
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="btn"
            >
              Close
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default DealModal;
