"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const VerifyCodeForm = () => {
  const [disable, setDisable] = useState(false);
  const router = useRouter()
  const handleConfirmCode = async (e) => {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const code = target.otp.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify_reset_code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    const result = await res.json()
    if(result.success === false){
      return toast.error(result.message)
    }
    else{
      toast.success('OTP Verified')
      router.push('/reset_new_password')
    }
  };
  return (
    <form
      onSubmit={handleConfirmCode}
      className="flex flex-col justify-center items-center min-h-screen gap-3 w-full"
    >
      <label className="fieldset-legend">Enter Your Email</label>
      <input
        name="email"
        type="email"
        className="input"
        placeholder="Type here"
        required
      />
      <label className="fieldset-legend">Enter Your OTP</label>
      <input
        name="otp"
        type="text"
        className="input"
        placeholder="Type here"
        required
      />
      <button
        disabled={disable}
        className="btn bg-green-500 text-white rounded-md btn-sm w-fit px-2"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default VerifyCodeForm;
