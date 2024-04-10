import React, { useState } from "react";
import axios from "axios";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [certificate, setCertificate] = useState("");
  const [showTime, setShowTime] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [postingStatus, setPostingStatus] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("rating", rating);
    formData.append("language", language);
    formData.append("duration", duration);
    formData.append("certificate", certificate);
    formData.append("showTime", showTime);
    formData.append("date", date);
    formData.append("price", price);
    formData.append("image", imageUrl);
    console.log("FormData:", formData);

    try {
      const response = await axios.post(
        "http://localhost:8084/movies",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      setTitle("");
      setRating("");
      setLanguage("");
      setDuration("");
      setCertificate("");
      setShowTime("");
      setDate("");
      setPrice("");
      setImageUrl("");
      setPostingStatus("success");
    } catch (error) {
      setPostingStatus("error");
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen mb-10">
      <div className="p-28 pb-0">
        <h1 className="text-4xl font-semibold uppercase tracking-tighter">
          Stream a Movie
        </h1>
        <p className="mt-10 text-gray-700">Fill the form below:</p>
      </div>
      <div className="form px-28 leading-10">
        <form className="mt-8 flex flex-wrap items-start justify-center gap-10" action="">
          <div className="flex flex-col items-start justify-center gap-3">
            <div className="flex gap-2 items-center">
              <label htmlFor="title">Movie Title -</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                placeholder="Enter the movie title"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="rating">Rating -</label>
              <input
                type="text"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="input-field"
                placeholder="Give rating"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="date">Date -</label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
                placeholder="Select date"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="showTime">Time -</label>
              <input
                type="time"
                name="showTime"
                value={showTime}
                onChange={(e) => setShowTime(e.target.value)}
                className="input-field"
                placeholder="Select time"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="price">Price -</label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-field"
                placeholder="$ Enter the price for ticket"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-center gap-3">
            <div className="flex gap-2 items-center">
              <label htmlFor="image">Image -</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setImageUrl(e.target.files[0])}
                className="input-field"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="language">Language -</label>
              <input
                type="text"
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input-field"
                placeholder="Enter the language"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="duration">Duration -</label>
              <input
                type="text"
                name="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="input-field"
                placeholder="Enter the duration"
                required
              />
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="certificate">Certificate -</label>
              <input
                type="text"
                name="certificate"
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                className="input-field"
                placeholder="Enter the certificate"
                required
              />
            </div>

            <div className="mt-10 flex items-center justify-end">
              <button
                onClick={handleUpload}
                className="tracking-tighter flex gap-3 items-center px-5 bg-zinc-500 rounded-full text-white uppercase"
              >
                Stream Movie
                <div className="w-2 h-2 bg-zinc-100 rounded-full"></div>
              </button>
            </div>

            {postingStatus && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-md">
                  <p className="text-xl font-semibold text-center">
                    Movies Streamed Successfully!
                  </p>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={(event) => {
                        handleBook(event, ticket);
                        setPostingStatus(false);
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
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
