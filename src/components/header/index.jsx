"use client";

import { CryptoContext } from "@/app/context/CryptoContext";
import React, { useContext } from "react";
import Carusel from "../carusel";

import "@/styles/header.css";
import Link from "next/link";

function Header() {
  const {
    current,
    handleCurrencyChange,
    handleOpenWatchList,
    openWatchList,
    convertCurrency,
    watchList,
    removeFromWatchList,
  } = useContext(CryptoContext);

  return (
    <div>
      <div className="w-full  fixed top-0 bacgraund">
        <div className="w-[1230px] h-[64px] flex mx-auto justify-between items-center">
          <div className="logo">
            <Link href={"/"}>
              <h2 className="title">CRYPTOFOLIO</h2>
            </Link>
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
              <button
                className="bg-blue-300 py-2 px-5 rounded-md text-black"
                onClick={() => handleOpenWatchList()}
              >
                Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
      {openWatchList && (
        <div className="w-[511px] h-[700px] bg_watch fixed right-0 z-10 flex flex-col">
          <h2 className="text-[30px] text-center my-[20px]">Watch List</h2>
          <div className="flex flex-wrap items-center justify-center gap-[20px] overflow-y-scroll no-scrollbar">
            {watchList && watchList.length > 0 ? (
              watchList.map((crypto) => (
                <div key={crypto.id}>
                  <div className="card w-[200px] h-[248px] flex flex-col mb-[30px] items-center bg-gray-950 rounded-[25px]">
                    <img
                      className="w-[118px] h-[118px] mt-[17px]"
                      src={crypto.image}
                      alt=""
                    />
                    <p className="text-[20px] mt-[35px] text-white">
                      {current === "₹"
                        ? `${current} ${convertCurrency(
                            crypto.current_price,
                            1
                          )} `
                        : current === "$"
                        ? `${current} ${convertCurrency(
                            crypto.current_price,
                            0.012
                          )} `
                        : ` ${current} ${convertCurrency(
                            crypto.current_price,
                            0.0111
                          )}`}
                    </p>
                    <button
                      onClick={() => removeFromWatchList(crypto.id)}
                      className="bg-red-600 px-3 py-1 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No items in watchlist</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
