'use client'

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from '@/utils/axiosInstance'
import { toast } from "sonner"

const RegisterPrimary = () => {
  const [formData, setFormData] = useState({ username: "", email: "", firstName: "", roles: ["ROLE_ADMIN"], mobileNumber: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post("auth/signup", formData);
      toast("Registration successful! Please check your email to verify your account.")
      setTimeout(() => {
        router.push("/check-email");
      }, 4000);
    } catch (err) {
      setError("Registration failed!");
    }
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
                  <input type="checkbox" /> I consent to Herboil processing my
                  personal data in order to send personalized marketing material
                  in accordance with the consent form and the privacy policy.
                </label>
                <label className="checkbox-inline">
                  <input type="checkbox" /> By clicking {`"create account"`}, I
                  consent to the privacy policy.
                </label>
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
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
