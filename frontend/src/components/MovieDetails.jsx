import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { bookTicket } from "./redux/action";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";

const MovieDetails = () => {
  const [ticket, setTicket] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();

  const handleBook = (event, ticket) => {
    event.preventDefault();
    dispatch(bookTicket(ticket));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/movies/${id}`);
        setTicket(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  const formattedTime = (time) => {
    if (time) {
      const [hour, minute] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(hour);
      date.setMinutes(minute);
      const formattedHour = date.getHours() % 12 || 12;
      const formattedMinute =
        (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
      const period = date.getHours() < 12 ? "AM" : "PM";
      return `${formattedHour}:${formattedMinute} ${period}`;
    } else {
      return "";
    }
  };

  const handleGetTicket = () => {
    setSuccessMessage(true);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="p-28 pb-20 w-full">
        <h1 className="text-[5vw] leading-[4vw] font-semibold uppercase tracking-tighter">
          Ticket Details
        </h1>
        <div
          key={ticket._id}
          className="ticket-container w-full flex items-center justify-center gap-20 mt-10"
        >
          <div
            className="image-container w-[40%] h-[65vh] bg-cover bg-no-repeat bg-center rounded-xl"
            style={{
              backgroundImage: `url(http://localhost:8084${ticket.imageurl})`,
            }}
          ></div>
          <div className="detail-container flex flex-col gap-4 w-[50%] min-h-[50vh]">
            <h1 className="font-bold text-4xl">{ticket.title}</h1>
            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Rating</span> - {ticket.rating}
              <FaStar className="text-red-600" />
            </h1>
            <h1>
              <span className="font-semibold">Price</span> - Rs.{ticket.price}
              .00
            </h1>
            <h1>
              <span className="font-semibold">Language</span> -{" "}
              {ticket.language}
            </h1>
            <h1>
              <span className="font-semibold">Date & Time</span> - {ticket.date}{" "}
              at {formattedTime(ticket.showTime)}
            </h1>
            <div className="mt-10 flex items-center justify-end">
              <button
                onClick={handleGetTicket}
                className="tracking-tighter flex gap-3 items-center px-5 py-2 bg-zinc-500 rounded-full text-white uppercase"
              >
                Get Ticket
                <div className="w-2 h-2 bg-zinc-100 rounded-full"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {successMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <p className="text-xl font-semibold text-center">
              Ticket Successfully Booked!
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={(event) => {
                  handleBook(event, ticket);
                  setSuccessMessage(false);
                }}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
