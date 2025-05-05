"use client";
// Login component
import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../../public/img/logo.png";
import Image from "next/image";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import "./signin.css";
import { NavBarLight } from "../../HomeComponents";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import fetchUser from "../users/_components/FetchUser";
import { useTranslations } from "next-intl";
const Login = () => {
  const { data } = fetchUser();
  const t = useTranslations();
  const router = useRouter();
  const loginFormRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // Get locale from the first part of the path: "/fr/contact" -> "fr"
  const locale = pathname.split("/")[1] || "en";
  useEffect(() => {
    if (loginFormRef.current) {
      loginFormRef.current.classList.add("fadeIn");
    }
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        role: "user",
        email: email.value,
        password: password.value,
      });

      if (result.error) {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: result.error,
          timer: 1500,
        });
        toast.error(t("Profile.InvalidLogin"));
      } else {
        router.push(`users/dashboard`);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
      toast.error("Sign in failed. Please try again.");
    }
  };

  return (
    <>
      <NavBarLight />
      <Toaster position="bottom-left" />
      <div className="container">
        <div ref={loginFormRef} className="login__wrap">
          <Link href="/">
            <Image src={Logo} alt="logo" className="logo" />
          </Link>

          <form className="form__login" onSubmit={handleSignIn}>
            <div className="input">
              <EmailIcon className="icon" />
              <input type="email" name="email" required />
              <label>{t("LoginPage.email")}</label>
            </div>
            <div className="input">
              <KeyIcon className="icon" />
              <input type="password" name="password" required />
              <label>{t("LoginPage.password")}</label>
            </div>
            <div className="cta">
              <button type="submit">{t("HomePage.signin")}</button>
              <Link className="links" href="forgot">
                {t("LoginPage.forgotPassword")}
              </Link>

              <p className="ctaP">
                {t("LoginPage.noAccount")}{" "}
                <Link className="links" href="signup">
                  {t("LoginPage.signUp")}
                </Link>
              </p>
            </div>
          </form>

          {/* Add overlay with spinner when loading */}
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <div className="processing-text">{t("LoginPage.processing")}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
