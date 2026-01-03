"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ResetForm = () => {
  const [disable, setDisable] = useState(false);

  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setDisable(true);
    const target = e.target;
    const get_email = target.email.value;
    const email = get_email.trim("");
    if (!email) {
      return toast.error("Enter a valid Email");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify_email/${email}`, {
      method: "POST",
    });
    const result = await res.json();
    if (result.success === false) {
      setDisable(false)
      return toast.error(result.message);
    } else {
      if (result.accepted.length > 0) {
        setDisable(false);
        toast.success("OTP sent to your email");
        router.push("/verify_reset_code");
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleResetPassword}
        className="flex flex-col justify-center items-center min-h-screen gap-3 w-full"
      >
        <label className="fieldset-legend">Write Your Email</label>
        <input
          name="email"
          type="email"
          className="input"
          placeholder="Type here"
        />
        <button
          disabled={disable}
          className="btn bg-green-500 text-white rounded-md btn-sm w-fit px-2"
        >
          Send OTP
        </button>
      </form>
    </>
  );
};

export default ResetForm;
