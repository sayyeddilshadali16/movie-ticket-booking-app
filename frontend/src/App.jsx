import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreateTicket from "./components/CreateTicket";
import BookedTickets from "./components/BookedTickets";
import MovieDetails from "./components/MovieDetails";
import Live from "./components/Live";
import UpdateMovie from "./components/UpdateMovie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createticket" element={<CreateTicket />} />
          <Route path="/moviedetails/:id" element={<MovieDetails />} />
          <Route path="/bookedtickets" element={<BookedTickets />} />
          <Route path="/live" element={<Live />} />
          <Route path="/updatemovie/:id" element={<UpdateMovie />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
