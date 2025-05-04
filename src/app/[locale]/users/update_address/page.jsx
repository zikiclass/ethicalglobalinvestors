"use client";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import DashboardPageNavigator from "../../../components/DashboardPageNavigator";
import { DashboardNavbar } from "../../../HomeComponents";
import BottomNavBar from "../_components/BottomNavBar";
import "../_components/styles/user.css";
import "../dashboard/styles/dashboard.css";
import { usePathname, useRouter } from "next/navigation";
import fetchUser from "../_components/FetchUser";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "use-intl";
const UpdateAddress = () => {
  const t = useTranslations("Profile");
  const router = useRouter();
  const { data } = fetchUser();
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const pathname = usePathname();

  // Get locale from the first part of the path: "/fr/contact" -> "fr"
  const locale = pathname.split("/")[1] || "en";
  // Update state when `data` changes
  useEffect(() => {
    if (data) {
      setStreetAddress(data.street_address || "");
      setPostalCode(data.postal_code || "");
      setCity(data.city || "");
      setState(data.state || "");
      setCountry(data.country || "");
    }
  }, [data]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put("/api/users/address", {
        streetAddress,
        postalCode,
        city,
        state,
        country,
      });
      if (response.data === "Address updated successfully") {
        toast.success(t("address_success"));
        router.push(`/${locale}/users/myprofile`);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(response.data.error || "An error occurred");
    }
  };
  return (
    <div>
      <DashboardNavbar />
      <div className="container" style={{ marginTop: "3rem" }}>
        <DashboardPageNavigator text={t("update_address_title")} />
        <div className="dashboard_">
          <div className="deposit">
            <h3>{t("update_address_title")}</h3>
            <div className="deposit__form notifications">
              <Toaster position="bottom-left" />
              <form action="#" onSubmit={handleUpdate}>
                <div className="input__deposit prof_email">
                  <label>{t("street_address")}</label>
                  <input
                    type="text"
                    name="street_address"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="input__deposit prof_email">
                  <label>{t("zip_code")}</label>
                  <input
                    type="text"
                    name="zip_code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>
                <div className="input__deposit prof_email">
                  <label>{t("city")}</label>
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="input__deposit prof_email">
                  <label>{t("state")}</label>
                  <input
                    type="text"
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                <div className="input__deposit prof_email">
                  <label>{t("country")}</label>
                  <input
                    type="text"
                    name="state"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </div>

                <Button title={t("update")} />
              </form>
            </div>
          </div>
        </div>
      </div>
      <BottomNavBar active="profile" />
    </div>
  );
};

export default UpdateAddress;
