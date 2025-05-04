"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const useFetchUser = () => {
  const { status, data: session } = useSession();
  const [data, setData] = useState(null); // Initialize data as null
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    if (status === "loading" || !session?.user?.email) return; // Do nothing while session is loading or no email available

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users", {
          email: session.user.email,
        });
        setData(response.data);

        // const responseAdmin = await axios.get("/api/admin");
        // setAdmin(responseAdmin.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [session, status]);

  return { data, status };
};

export default useFetchUser;
