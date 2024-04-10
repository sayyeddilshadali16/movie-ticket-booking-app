import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelTicket } from "./redux/action";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookedTickets = () => {
  const bookedTickets = useSelector((state) => state.bookTicket);
  const dispatch = useDispatch();

  const handleClose = (event, ticket) => {
    event.preventDefault();
    dispatch(cancelTicket(ticket));
  };

  const emptyTicket = () => {
    return (
      <div className="">
        <h3>No tickets booked</h3>
      </div>
    );
  };

  const moreTickets = () => {
    return (
      <div className="">
        <Link to="/">
          <h1>Book more tickets</h1>
        </Link>
      </div>
    );
  };

  return (
    <div className="p-28">
      <h1 className="text-4xl font-bold uppercase mb-10">Booked Tickets</h1>
      <div className="">
        {bookedTickets.length === 0 && emptyTicket()}
        {bookedTickets.length !== 0 &&
          bookedTickets.map((bookedTicket) => (
            <div key={bookedTicket.id}>
              <h3 className="font-semibold">{bookedTicket.title}</h3>
              <p className="flex items-center gap-2">
                Ratings - {bookedTicket.rating}
                <FaStar />
              </p>
              <p>Price - Rs.{bookedTicket.price}.00</p>
              <button
                className="mt-2 bg-red-400 text-white py-1 px-3 rounded-lg"
                onClick={(event) => handleClose(event, bookedTicket)}
              >
                Cancle
              </button>
            </div>
          ))}
        {bookedTickets.length == 0 && moreTickets()}
      </div>
    </div>
  );
};

export default BookedTickets;
