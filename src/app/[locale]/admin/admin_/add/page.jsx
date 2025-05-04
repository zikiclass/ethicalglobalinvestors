"use client";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../../Layout";
import styles from "../../users/users.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Link from "next/link";
import ReplyIcon from "@mui/icons-material/Reply";
import { adminSchema } from "../../../../validationSchemas";
import delay from "delay";
const AddAdmin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(adminSchema) });

  const signupFormRef = useRef(null);

  return (
    <Layout pageTitle="Add Administrator">
      <div className={styles.wrapper} ref={signupFormRef}>
        <Link href="./" className={styles.btnBack}>
          <ReplyIcon />
          Back
        </Link>
        <Toaster position="bottom-left" />

        <form
          action=""
          className={styles.form}
          onSubmit={handleSubmit(async (data) => {
            try {
              const response = await axios.post("/api/admin", {
                ...data,
              });
              if (response.data.message === "success") {
                toast.success("Admin registered successfully");
                delay(2000);
                router.push("./");
              } else {
                console.log(response.data.message);
                //toast.error(response.data.message);
              }
            } catch (error) {
              toast.error("An error occured");
            }
          })}
        >
          <div className={styles.input}>
            <label>First Name</label>
            <input
              type="text"
              required
              name="firstname"
              placeholder="Enter your first name"
              {...register("firstname")}
            />
            {errors.firstname && <p>{errors.firstname.message}</p>}
          </div>
          <div className={styles.input}>
            <label>Last Name</label>
            <input
              type="text"
              required
              name="lastname"
              placeholder="Enter your last name"
              {...register("lastname")}
            />
            {errors.lastname && <p>{errors.lastname.message}</p>}
          </div>
          <div className={styles.input}>
            <label>Email Address</label>
            <input
              type="email"
              required
              name="emailaddress"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className={styles.input}>
            <label>Password</label>
            <input
              type="password"
              required
              name="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className={styles.input}>
            <label>Confirm Password</label>
            <input
              type="password"
              required
              name="confirmpassword"
              placeholder="Enter your confirm password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </div>

          <input type="submit" value="Sign Up" className={styles.btnSubmit} />
        </form>
      </div>
    </Layout>
  );
};

export default AddAdmin;
