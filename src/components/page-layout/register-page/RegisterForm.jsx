"use client";
import React, { useState } from "react";
import Link from "next/link";
import registerUser from "@/actions/auth/registerUser";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [registerType, setRegisterType] = useState("email");
  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();
    const target = e.target;
    const value = target.register_method_value.value;

    const name = target.name.value;
    const password = target.password.value;
    const confirm_password = target.confirm_password.value;

    if (registerType === "tel") {
      const bdPattern = /^01[3-9][0-9]{8}$/;
      if (!bdPattern.test(value)) {
        toast.error(
          "Enter a valid Bangladeshi phone number (e.g., 017XXXXXXXX)"
        );
        return;
      }
    }

    if (password !== confirm_password) {
      toast.error("password not matched");
      return;
    }

    const user = {
      name: name,
      [registerType === "email" ? "email" : "phone"]: value,
      password: password,
      method: registerType === "email" ? "email" : "phone",
    };
    const result = await registerUser(user);
    if (result.success === false) {
      toast.error(result.message);
      return;
    } else if (result.success === true) {
      const response = await signIn("credentials", {
        identifier: value,
        password,
        redirect: false,
      });
      if (response.ok) {
        toast.success("Registration Successful");
        router.push("/");
      }
    }
  };
  return (
    <form onSubmit={handleForm}>
      <fieldset className="fieldset">
        <p className="font-bold text-lg smd:text-2xl mb-3">Create an Account</p>
        <label className="label">
          {registerType === "email" ? "Email" : "Phone Number"}
        </label>
        <input
          type={registerType}
          className="input "
          placeholder={registerType === "email" ? "Email" : "01XXXXXXXXX"}
          name="register_method_value"
          required
        />
        {/* <p
          onClick={() => {
            registerType === "email"
              ? setRegisterType("tel")
              : setRegisterType("email");
          }}
          className="link link-hover hover:text-blue-600 mb-3"
        >
          use {registerType === "email" ? "number" : "email"} instead
        </p> */}
        <label className="label">Your Name</label>
        <input
          type="text"
          required
          className="input"
          placeholder="Name"
          name="name"
        />
        <label className="label">Password</label>
        <input
          type="password"
          required
          className="input"
          placeholder="Password"
          name="password"
        />
        <label className="label">Confirm Password</label>
        <input
          type="password"
          className="input"
          placeholder="Confirm Password"
          required
          name="confirm_password"
        />
        <div className="flex justify-between items-center">
          <Link href={"/reset_password"}>
            <p className="link link-hover hover:text-red-600">
              Forgot password?
            </p>
          </Link>

          <Link href={"/auth/login"}>
            <p className="link link-hover hover:text-blue-600">Sign In</p>
          </Link>
        </div>
        <button className="btn btn-neutral mt-4">Register</button>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
