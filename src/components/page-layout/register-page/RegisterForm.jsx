"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import registerUser from "@/actions/auth/registerUser";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";

const RegisterForm = () => {
  const [registerType, setRegisterType] = useState("email");
  const router = useRouter();
  const { lan } = useContext(LanguageContext);

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
        <p className="font-bold text-lg smd:text-2xl mb-3">
          {translation[lan].authenticationPage.registration.heading}
        </p>
        <label className="label">
          {registerType === "email" ? `${translation[lan].authenticationPage.registration.email.email_heading}` : "Phone Number"}
        </label>
        <input
          type={registerType}
          className="input "
          placeholder={registerType === "email" ? `${translation[lan].authenticationPage.registration.email.email_placeholder}` : "01XXXXXXXXX"}
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
        <label className="label">{translation[lan].authenticationPage.registration.your_name.name_heading}</label>
        <input
          type="text"
          required
          className="input"
          placeholder={translation[lan].authenticationPage.registration.your_name.name_placeholder}
          name="name"
        />
        <label className="label">{translation[lan].authenticationPage.registration.password.password_heading}</label>
        <input
          type="password"
          required
          className="input"
          placeholder={translation[lan].authenticationPage.registration.password.password_placeholder}
          name="password"
        />
        <label className="label">{translation[lan].authenticationPage.registration.confirm_password.confirm_password_heading}</label>
        <input
          type="password"
          className="input"
          placeholder={translation[lan].authenticationPage.registration.confirm_password.confirm_password_placeholder}
          required
          name="confirm_password"
        />
        <div className="flex justify-between items-center">
          <Link href={"/reset_password"}>
            <p className="link link-hover hover:text-red-600">
              {translation[lan].authenticationPage.forgotPassword}
            </p>
          </Link>

          <Link href={"/auth/login"}>
            <p className="link link-hover hover:text-blue-600">{translation[lan].authenticationPage.signIn}</p>
          </Link>
        </div>
        <button className="btn btn-neutral mt-4">{translation[lan].authenticationPage.register}</button>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
