"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const [disable, setDisable] = useState(false);
  const router = useRouter()

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;
    const confirm_password = target.confirm_password.value;
    if (password !== confirm_password) {
      return toast.error("Password Did Not Matched");
    } else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reset_new_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (result.success === false) {
        return toast.error(result.message);
      }
      else{
        toast.success('Password Reset Successful')
        router.push('/auth/login')
      }
    }
  };
  return (
    <form
      onSubmit={handleResetPassword}
      className="flex flex-col justify-center items-center min-h-screen gap-3 w-full"
    >
      <label className="fieldset-legend">Enter Your Email</label>
      <input
        name="email"
        type="email"
        className="input"
        placeholder="Type here"
      />
      <label className="fieldset-legend">Password</label>
      <input
        name="password"
        type="password"
        className="input"
        placeholder="Type here"
        required
      />
      <label className="fieldset-legend">Confirm Password</label>
      <input
        name="confirm_password"
        type="password"
        className="input"
        placeholder="Type here"
        required
      />
      <button
        disabled={disable}
        className="btn bg-green-500 text-white rounded-md btn-sm w-fit px-2"
      >
        Reset
      </button>
    </form>
  );
};

export default ResetPasswordForm;
