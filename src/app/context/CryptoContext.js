// context/CryptoContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context for the crypto data
export const CryptoContext = createContext();

// Create a provider component
export const CryptoProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState();
  const [caruselData , setCaruselData] = useState([])
  const [current, setCurrent] = useState("₹");
  const [searchTerm, setSearchTerm] = useState("");
  const [watchList, setWatchList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const result = await response.json();
      setData(result);
      setCaruselData(result);
      setOriginalData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCurrencyChange = (e) => {
    setCurrent(e.target.value);
  };

  useEffect(() => {
    const storedWatchList = localStorage.getItem('watchList');
    if (storedWatchList) {
      setWatchList(JSON.parse(storedWatchList));
    }
  }, []);

  const getPriceTrunk = (price) => {
    const parts = price.toString().split(".");
    if (parts.length === 1) {
      // No decimal part
      return price >= 0 ? "+" + price : price;
    } else {
      // Truncate to two decimal places
      const truncated = parseFloat(parts[0] + "." + parts[1].slice(0, 2));
      return truncated >= 0 ? "+" + truncated : truncated;
    }
  };

  const convertCurrency = (price, rate) => {
    return (price * rate).toFixed(2);
  };

  const NumberToMillions = (num) => {
    const numStr = num.toString();
    const numLength = numStr.length;
    let result = "";

    for (let i = 0; i < numLength; i++) {
      result = numStr.charAt(numLength - 1 - i) + result;
      if ((i + 1) % 3 === 0 && i !== numLength - 1) {
        result = "," + result;
      }
    }

    return result + "M";
  };

  const convertMarketCup = (marketCap, rate) => {
    return (marketCap * rate).toFixed(2);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm === '') {
      setData(originalData); // Reset to original data if search term is empty
    } else {
      const filteredData = originalData.filter(crypto => 
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData);
    }
  };

  const addToWatchList = (crypto) => {
    const storedWatchList = localStorage.getItem('watchList');
    const watchList = storedWatchList ? JSON.parse(storedWatchList) : [];
  
    if (!watchList.some(item => item.id === crypto.id)) {
      const updatedWatchList = [...watchList, crypto];
  
      setWatchList(updatedWatchList);
      localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
    }
  };

  return (
    <CryptoContext.Provider
      value={{
        data,
        fetchData,
        current,
        getPriceTrunk,
        convertCurrency,
        NumberToMillions,
        convertMarketCup,
        handleCurrencyChange,
        handleSearch,
        searchTerm,
        addToWatchList,
        watchList,
        caruselData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

// Custom hook to use the CryptoContext
export const useCrypto = () => {
  return useContext(CryptoContext);
};
