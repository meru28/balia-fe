'use client'

import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react"
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"

const LoginPrimary = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      username: email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email atau password salah!");
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="ltn__login-area pb-65">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Sign In <br />
                To Your Account
              </h1>
              <p>
                Discover the latest trends in fashion and elevate your style. <br/>
                Shop now for unique looks and timeless pieces.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="account-login-inner">
              <form onSubmit={handleLogin} className="ltn__form-box contact-form-box">
                <input
                  type="text"
                   name="email"
                   placeholder="Username or Email*"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className="text-danger">{error}</p>}
                <div className="btn-wrapper mt-0">
                  <button
                    className="theme-btn-1 btn btn-block w-100"
                    type="submit"
                  >
                    SIGN IN
                  </button>
                </div>
                <div className="go-to-btn mt-20">
                  <Link
                    href="#"
                    title="Wishlist"
                    data-bs-toggle="modal"
                    data-bs-target="#ltn_forget_password_modal"
                  >
                    <small>FORGOTTEN YOUR PASSWORD?</small>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="account-create text-center pt-50">
              <h4>{"DON'T"} HAVE AN ACCOUNT?</h4>
              <p>
                Add items to your wishlistget personalised recommendations{" "}
                <br />
                check out more quickly track your orders register
              </p>
              <div className="btn-wrapper">
                <Link href="/register" className="theme-btn-1 btn black-btn">
                  CREATE ACCOUNT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrimary;
