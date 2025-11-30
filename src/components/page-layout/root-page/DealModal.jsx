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

  const submitDealForm = async (e) => {
    e.preventDefault();
    const target = e.target;
    const product_object = {
      title: target.title.value,
      company: target.company.value.toLowerCase(),
      regular_price: target.regular_price.value,
      offer_price: target.offer_price.value,
      offer_percent: target.offer_percent.value,
      product_info: target.product_info.value,
      product_link: target.product_link.value,
      product_image: target.product_image.value,
      category: target.category.value.toLowerCase(),
      created_at: new Date(),
      updated_at: undefined,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/upload_product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product_object),
      }
    );
    const result = await res.json();

    if (result?.acknowledged === true) {
      dispatch(closeModal());
      return alert("Insert Successfull");
    } else {
      dispatch(closeModal());
      return alert("Insert Error");
    }
  };
  return (
    <>
      <dialog
        ref={dialogueRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box p-3">
          <form
            onSubmit={submitDealForm}
            method="dialog"
            className="flex flex-col items-center gap-3"
          >
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Title</legend>
              <input
                required
                type="text"
                name="title"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Company</legend>
              <input
                required
                type="text"
                name="company"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Regular Price</legend>
              <input
                required
                type="text"
                name="regular_price"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Offer Price</legend>
              <input
                required
                type="text"
                name="offer_price"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Offer Percent</legend>
              <input
                required
                type="text"
                name="offer_percent"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Product Info</legend>
              <input
                required
                type="text"
                name="product_info"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Product Link</legend>
              <input
                required
                type="text"
                name="product_link"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Product Image</legend>
              <input
                required
                type="text"
                name="product_image"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Category</legend>
              <input
                type="text"
                required
                name="category"
                className="input"
                placeholder="Type here"
              />
            </fieldset>

            <div className="flex items-center justify-center gap-3">
              <button className="btn">Submit</button>
              <button
                type="button"
                onClick={() => dispatch(closeModal())}
                className="btn"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default DealModal;
