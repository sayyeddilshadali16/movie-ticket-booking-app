import React from "react";

const Footer = () => {
  return (
    <div className="flex gap-5 w-full min-h-[80vh] bg-black text-white p-20 rounded-tl-3xl rounded-tr-3xl">
      <div className="w-1/2 h-full flex flex-col justify-between">
        <div className="heading">
          <h1 className="text-[5vw] leading-[4vw] font-semibold uppercase tracking-tighter">
            Stream-
          </h1>
          <h1 className="text-[5vw] font-semibold uppercase leading-[4vw] tracking-tighter">
            Shows
          </h1>
        </div>
      </div>
      <div className="w-1/2">
        <h1 className="text-[5vw] font-semibold uppercase leading-[4vw] tracking-tighter">
          Book Tickets
        </h1>
        <div className="flex flex-wrap justify-between">
          <div className="social mt-10">
            <h1>S:</h1>
            {[
              "Facebook",
              "Twitter",
              "Instagram",
              "LinkedIn",
              "Behance",
              "Dribbble",
            ].map((item, index) => {
              return (
                <a
                  key={index}
                  className="block font-light underline underline-offset-4"
                  href="#"
                >
                  {item}
                </a>
              );
            })}
          </div>
          <div className="location mt-10">
            <h1>L:</h1>
            {["Nagpur - 440034", "Maharashtra", "India"].map((item, index) => {
              return (
                <a
                  key={index}
                  className="block font-light underline underline-offset-4"
                  href="#"
                >
                  {item}
                </a>
              );
            })}
          </div>
          <div className="email mt-10">
            <h1>E:</h1>
            {["help@eventwave.com"].map((item, index) => {
              return (
                <a
                  key={index}
                  className="block font-light underline underline-offset-4"
                  href="#"
                >
                  {item}
                </a>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between text-gray-400 mt-32">
          <p>
            &copy; Sayyed Dilshad Ali 2024.{" "}
            <span className="underline underline-offset-4">Legal Terms</span>
          </p>
          <p>Website by Sayyed Dilshad Ali</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
