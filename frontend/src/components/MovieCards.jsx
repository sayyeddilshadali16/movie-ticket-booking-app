import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Cards from "./Cards";
import axios from "axios";

const MovieCards = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8084/movies");
      setFilteredData(response.data);
      setAllData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    const filtered = allData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed=".1"
      className="w-full min-h-screen p-20 bg-[#f1f1f1] rounded-tl-3xl rounded-tr-3xl text-black sm:p-10"
    >
      <div>
        <form className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-300 border-gray-300 border-2 flex focus-within:border-gray-400">
          <input
            type="text"
            placeholder="Search for movies..."
            className="bg-transparent w-full focus:outline-none pr-4 border-0 focus:ring-0 px-0 py-0 placeholder:text-gray-500"
            name="topic"
            value={searchInput}
            onChange={handleSearch}
          />
          <button className="w-[50px] h-[50px] flex items-center justify-center px-4 rounded-full font-semibold text-xl bg-black text-white -mr-3">
            <FiSearch />
          </button>
        </form>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="event-container w-full flex flex-wrap items-center justify-center mt-20">
          <Cards data={filteredData} />
        </div>
      )}
    </div>
  );
};

export default MovieCards;
