"use client";

import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const [disable, setDisable] = useState(false);
  const router = useRouter()
  const {lan} = useContext(LanguageContext)

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
      <label className="fieldset-legend">{translation[lan].resetPassword.email.label}</label>
      <input
        name="email"
        type="email"
        className="input"
        placeholder={translation[lan].resetPassword.email.placeholder}
      />
      <label className="fieldset-legend">{translation[lan].resetPassword.password.label}</label>
      <input
        name="password"
        type="password"
        className="input"
        placeholder={translation[lan].resetPassword.password.placeholder}
        required
      />
      <label className="fieldset-legend">{translation[lan].resetPassword.confirmPassword.label}</label>
      <input
        name="confirm_password"
        type="password"
        className="input"
        placeholder={translation[lan].resetPassword.confirmPassword.placeholder}
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
