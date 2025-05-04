"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const useFetchAdmin = () => {
  const { status, data: session } = useSession();
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    if (status === "loading" || !session?.user?.email) return; // Do nothing while session is loading or no email available

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin");
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [session, status]);

  return { admin, status };
};

export default useFetchAdmin;
