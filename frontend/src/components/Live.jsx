import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Live = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8084/movies");
      setAllData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/movies/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-28 w-full min-h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="px-20 pt-2">
          <h1 className="uppercase text-4xl font-bold mb-10">Streaming Now</h1>
          <ul className="flex flex-col gap-2">
            {allData.map((data) => (
              <li
                key={data._id}
                className="flex items-center justify-between border-2 border-gray-300 p-2 rounded-lg"
              >
                <div className="w-1/2 flex items-center justify-between">
                  <p>{data.title}</p>
                  <p>{data.showTime}</p>
                </div>
                <div className="w-1/2 flex items-center justify-end gap-5">
                  <button
                    className="px-2 bg-red-400 text-white rounded-lg"
                    onClick={() => handleDelete(data._id)}
                  >
                    Delete
                  </button>{" "}
                  <Link to={`/updatemovie/${data._id}`}>
                    {" "}
                    <button className="px-2 bg-sky-500 text-white rounded-lg">
                      Update
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Live;
