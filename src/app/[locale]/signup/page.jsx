"use client";
import Link from "next/link";
import { useEffect, useRef, useState, Suspense } from "react";
import { NavBarLight } from "../../HomeComponents";
import PageNavigator from "../../components/PageNavigator";
import { countries, currency } from "../../components/index/data";
import "./signup.css";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { registerSchema } from "../../validationSchemas";
import toast, { Toaster } from "react-hot-toast";

// RegisterForm Component
const RegisterForm = () => {
  const t = useTranslations();
  const searchParams = useSearchParams(); // Get search params directly
  const referralId = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const signupFormRef = useRef(null);

  useEffect(() => {
    if (signupFormRef.current) {
      signupFormRef.current.classList.add("fadeIn");
    }
  }, []);

  return (
    <>
      <NavBarLight />
      <div className="container">
        <PageNavigator text={t("SignUpPage.signUp")} /> {/* Localized title */}
        <div className="register__wrap">
          <h3>{t("SignUpPage.signUp")}</h3> {/* Localized heading */}
          <div className="register__form" ref={signupFormRef}>
            <form
              onSubmit={handleSubmit(async (data) => {
                try {
                  setIsLoading(true);
                  await axios.post("/api/register", { ...data, referralId });
                  toast.success(t("SignUpPage.successMessage"));
                  router.push("/signin");
                } catch (error) {
                  setIsLoading(false);
                  Swal.fire({
                    icon: "error",
                    title: t("ErrorPage.error"),
                    text: t("ErrorPage.emailAlreadyRegistered"),
                    timer: 1500,
                  });
                  toast.error(t("ErrorPage.emailAlreadyRegistered"));
                }
              })}
            >
              <Toaster position="bottom-left" />
              <div className="reg">
                <select name="accounttype" {...register("accounttype")}>
                  <option value="LIVE">
                    {t("SignUpPage.accountTypeLive")}
                  </option>
                  <option value="DEMO">
                    {t("SignUpPage.accountTypeDemo")}
                  </option>
                </select>
                <label htmlFor="accountType">
                  {t("SignUpPage.accountType")}
                </label>
              </div>
              <div className="reg">
                <input type="email" name="email" {...register("email")} />
                <label htmlFor="email">{t("SignUpPage.email")}</label>
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="reg">
                <input
                  type="password"
                  name="password"
                  {...register("password")}
                />
                <label htmlFor="password">{t("SignUpPage.password")}</label>
                {errors.password && <p>{errors.password.message}</p>}
              </div>
              <div className="reg">
                <input
                  type="password"
                  name="confirmPassword"
                  {...register("confirmPassword")}
                />
                <label htmlFor="confirmPassword">
                  {t("SignUpPage.confirmPassword")}
                </label>
                {errors.confirmPassword && (
                  <p>{errors.confirmPassword.message}</p>
                )}
              </div>
              <div className="reg">
                <input
                  type="text"
                  name="first_name"
                  {...register("first_name")}
                />
                <label htmlFor="firstName">{t("SignUpPage.firstName")}</label>
                {errors.first_name && <p>{errors.first_name.message}</p>}
              </div>
              <div className="reg">
                <input
                  type="text"
                  name="last_name"
                  {...register("last_name")}
                />
                <label htmlFor="lastName">{t("SignUpPage.lastName")}</label>
                {errors.last_name && <p>{errors.last_name.message}</p>}
              </div>
              <div className="reg">
                <input type="number" name="mobile" {...register("mobile")} />
                <label htmlFor="phoneNumber">
                  {t("SignUpPage.mobileNumber")}
                </label>
                {errors.mobile && <p>{errors.mobile.message}</p>}
              </div>
              <div className="reg">
                <select name="currency" {...register("currency")}>
                  {currency.map((curr) => (
                    <option value={curr.symbol} key={curr.value}>
                      {curr.value}
                    </option>
                  ))}
                </select>
                <label htmlFor="currency">{t("SignUpPage.currency")}</label>
              </div>
              <div className="reg">
                <select name="country" {...register("country")}>
                  {countries.map((country) => (
                    <option value={country.name} key={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="country">{t("SignUpPage.country")}</label>
              </div>
              <div className="reg">
                <input type="text" name="state" {...register("state")} />
                <label htmlFor="state">{t("SignUpPage.state")}</label>
                {errors.state && <p>{errors.state.message}</p>}
              </div>
              <div className="reg">
                <input type="text" name="city" {...register("city")} />
                <label htmlFor="city">{t("SignUpPage.city")}</label>
                {errors.city && <p>{errors.city.message}</p>}
              </div>

              <div className="terms__reg">
                <input type="checkbox" name="terms" required />
                <span>{t("SignUpPage.termsText")}</span>
              </div>
              <div className="cta">
                {!isLoading ? (
                  <button type="submit">{t("SignUpPage.createAccount")}</button>
                ) : (
                  <span className="processing-text">
                    {t("SignUpPage.processing")}
                  </span>
                )}

                <span>
                  {t("SignUpPage.alreadyHaveAccount")}{" "}
                  <Link href="signin" style={{ color: "#6648fe" }}>
                    {t("SignUpPage.login")}
                  </Link>
                </span>
              </div>
            </form>
            {/* Add overlay with spinner when loading */}
            {isLoading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
                <div className="processing-text">
                  {t("SignUpPage.creatingAccount")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Main Register Component wrapped in Suspense
const Register = () => {
  const t = useTranslations();
  return (
    <Suspense fallback={<div>{t("LoadingPage.loading")}</div>}>
      <RegisterForm />
    </Suspense>
  );
};

export default Register;
