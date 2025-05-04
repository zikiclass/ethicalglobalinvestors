"use client";
import React, { Suspense, useState, useEffect } from "react";
import Layout from "../Layout";
import styles from "../users/users.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const Whatsapp = () => {
  const [whatsapp, setWhatsapp] = useState("");

  const router = useRouter();
  // Fetch wallet data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/whatsapp`);

        if (response.data.whatsapp)
          // Map wallet addresses to corresponding state variables
          console.log(response);
        setWhatsapp(response.data.whatsapp.whatsappnumber);
      } catch (error) {
        toast.error("Error fetching wallet data");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put("/api/admin/whatsapp", {
        whatsapp,
      });

      if (response.data.message === "Whatsapp updated successfully") {
        router.push(`dashboard`);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Whatsapp number updated successfully",
          timer: 1500,
        });
        toast.success("Whatsapp number updated successfully");
      } else {
        toast.error("An error occurred while updating whatsapp number");
      }
    } catch (error) {
      toast.error("An error occurred while updating whatsapp number");
      console.error(error);
    }
  };

  return (
    <Layout pageTitle="Whatsapp Number">
      <div className={styles.wrapper}>
        <Toaster position="bottom-left" />
        <form action="" className={styles.fund} onSubmit={handleUpdate}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.input}>
                <label>Whatsapp Number</label>
                <input
                  type="text"
                  name="whatsapp"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={whatsapp}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits
                    if (/^\d*$/.test(value)) {
                      setWhatsapp(value);
                    }
                  }}
                  placeholder="Enter WhatsApp number"
                />
              </div>
            </div>
          </div>

          <input type="submit" value="Update" className={styles.btnSubmit} />
        </form>
      </div>
    </Layout>
  );
};

// Wrapper component that uses Suspense
const Whatsap = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <Whatsapp />
    </Suspense>
  );
};

export default Whatsap;
