"use client";

import { CryptoContext } from "@/app/context/CryptoContext";
import React, { useContext } from "react";
import Carusel from "../carusel";

import "@/styles/header.css"

function Header() {
  const { current, handleCurrencyChange } = useContext(CryptoContext);

  return (
    <div>
      <div className="w-full  fixed top-0 bacgraund">
        <div className="w-[1230px] h-[64px] flex mx-auto justify-between items-center">
          <div className="logo">
            <h2 className="title">CRYPTOFOLIO</h2>
          </div>
          <div className="flex items-center">
            <div className="current_price">
              <select
                className="bacgraund mr-3"
                value={current}
                onChange={handleCurrencyChange}
              >
                <option value="₹">INR</option>
                <option value="$">USD</option>
                <option value="€">EUR</option>
              </select>
            </div>
            <div className="watchlist_btn">
              <button className="bg-blue-300 py-2 px-5 rounded-md">
                Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
      <Carusel />
    </div>
  );
}

export default Header;
