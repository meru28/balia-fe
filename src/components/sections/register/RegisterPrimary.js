'use client'

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import useRegisterMutation from '@/hooks/useRegisterMutation';

const Spinner = () => (
  <svg
    className="tw-animate-spin -tw-ml-1 tw-mr-3 tw-h-5 tw-w-5 tw-text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="tw-opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="tw-opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const RegisterPrimary = () => {
  const [formData, setFormData] = useState({ username: "", email: "", firstName: "", roles: ["ROLE_ADMIN"], mobileNumber: "" });
  const [error, setError] = useState(null);
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const { mutate: register, isLoading } = useRegisterMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isChecked) {
      toast("Please agree to the privacy policy first");
      return;
    }

    register(formData, {
      onSuccess: () => {
        setTimeout(() => {
          router.push(`/check-email?email=${encodeURIComponent(formData.email)}`);
        }, 3000);
      },
    });
  };


  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Register <br />
                Your Account
              </h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
                Sit aliquid, Non distinctio vel iste.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="account-login-inner">
              <form onSubmit={handleSubmit} className="ltn__form-box contact-form-box">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  required
                />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Mobile Phone Number"
                  required
                />
                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  /> By clicking {`"create account"`}, I
                  consent to the privacy policy.
                  { isLoading }
                </label>
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                  >
                    {isLoading ? (
                      <div className="tw-flex tw-justify-center tw-items-center">
                        <Spinner/>
                        Please Wait...
                      </div>
                    ) : (
                      "CREATE ACCOUNT"
                    )}
                  </button>
                </div>
                {error && <p className="text-danger">{error}</p>}
              </form>
              <div className="by-agree text-center">
                <p>By creating an account, you agree to our:</p>
                <p>
                  <Link href="#">
                    TERMS OF CONDITIONS &nbsp; &nbsp; | &nbsp; &nbsp; PRIVACY
                    POLICY
                  </Link>
                </p>
                <div className="go-to-btn mt-50">
                  <Link href="/login">ALREADY HAVE AN ACCOUNT ?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPrimary;
