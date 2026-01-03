"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();

  const [loginType, setLoginType] = useState("email");

  const handleForm = async (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.login_method_value.value;
    const password = target.password.value;

    if (loginType === "tel") {
      const bdPattern = /^01[3-9][0-9]{8}$/;
      if (!bdPattern.test(value)) {
        toast.error("Enter a valid Bangladeshi phone number (e.g., 017XXXXXXXX)");
        return;
      }
    }

    const response = await signIn("credentials", {
      identifier: value,
      password,
      redirect: false,
    });

    if (response.ok) {
      router.push("/");
    } else {
      toast.error("login failed");
    }
  };
  return (
    <form onSubmit={handleForm}>
      <fieldset className="fieldset">
        <p className="font-bold text-lg smd:text-2xl mb-3">Account Login</p>
        <label className="label">
          {loginType === "email" ? "Email" : "Phone Number"}
        </label>
        <input
          required
          type={loginType}
          className="input"
          placeholder={loginType === "email" ? "Email" : "01XXXXXXXX"}
          name="login_method_value"
        />
        {/* <p
          onClick={() => {
            loginType === "email" ? setLoginType("tel") : setLoginType("email");
          }}
          className="link link-hover hover:text-blue-500 mb-3"
        >
          use {loginType === "email" ? "number" : "email"} instead
        </p> */}
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          required
          name="password"
        />
        <div className="flex justify-between items-center">
          <Link href={"/reset_password"}>
            <p className="link link-hover hover:text-red-600">
              Forgot password?
            </p>
          </Link>
          <Link href={"/auth/register"}>
            <p className="link link-hover hover:text-blue-600">Sign Up</p>
          </Link>
        </div>
        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </form>
  );
};

export default LoginForm;
