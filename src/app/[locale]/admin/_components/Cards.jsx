import React, { useState, useEffect } from "react";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Groups2Icon from "@mui/icons-material/Groups2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import Link from "next/link";
const Cards = () => {
  const [deposit, setDeposit] = useState(0);
  const [profit, setProfit] = useState(0);
  const [users, setUsers] = useState(0);
  const [with_d, setWith_d] = useState(0);

  const formatNumber = (number) => {
    // Check if the number is a valid number or convert it to a string
    const parts = parseFloat(number).toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users");
        if (response.data) {
          setDeposit(response.data.response._sum.deposit || 0);
          setProfit(response.data.response._sum.profit || 0);
          setUsers(response.data.users._count.email || 0);
          setWith_d(response.data.withdrawals._sum.amount || 0);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [deposit, profit, users]);
  const cardLists = [
    {
      id: 1,
      title: "Users",
      amount: users,
      icon: <Groups2Icon style={{ fontSize: "3rem" }} />,
      color: "#feab2c",
      link_href: "users",
    },
    {
      id: 2,
      title: "Deposits",
      amount: "$" + formatNumber(deposit),
      icon: (
        <CurrencyBitcoinIcon
          style={{
            fontSize: "3rem",
            backgroundColor: "#fff",
            color: "#ac4bbb",
            borderRadius: "50px",
          }}
        />
      ),
      color: "#ac4bbb",
      link_href: "users",
    },
    {
      id: 3,
      title: "Withdrawals",
      amount: "$" + formatNumber(with_d),
      icon: (
        <AttachMoneyIcon
          style={{
            fontSize: "3rem",
            backgroundColor: "#fff",
            color: "#3693ff",
            borderRadius: "50px",
          }}
        />
      ),
      color: "#3693ff",
      link_href: "users",
    },
    {
      id: 4,
      title: "Profits",
      amount: "$" + formatNumber(profit),
      icon: (
        <CurrencyBitcoinIcon
          style={{
            fontSize: "3rem",
            backgroundColor: "#fff",
            color: "#ac4bbb",
            borderRadius: "50px",
          }}
        />
      ),
      color: "#ac4bbb",
      link_href: "users",
    },
  ];
  return (
    <div className="cards">
      {cardLists.map((card) => (
        <Link
          className="card"
          key={card.id}
          style={{ backgroundColor: "#D3D3D3", color: "#212096" }}
          href={card.link_href}
        >
          <div className="title">
            <ArrowDropDownIcon /> <span>{card.title}</span>
          </div>
          <div className="details">
            <span>{card.amount}</span>
            {card.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Cards;
