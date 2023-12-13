import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const Catalogue = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(new Date());
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:5000/data";
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [selected]);

  const formatDate = (date) => {
    if (!date || !date.from) {
      return [];
    }

    const fromDate = new Date(date.from);

    if (isNaN(fromDate)) {
      return [];
    }

    if (!date.to) {
      return [format(fromDate, "dd-MM-yyyy")];
    }

    const toDate = new Date(date.to);

    if (isNaN(toDate)) {
      return [];
    }

    const dateList = [];

    for (
      let currentDate = fromDate;
      currentDate <= toDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      dateList.push(format(currentDate, "dd-MM-yyyy"));
    }

    return dateList;
  };

  const calculatePrice = (speaker, days) => {
    const priceObject =
      days > 6
        ? speaker.price.find((item) => item.day === 6)
        : speaker.price.find((item) => item.day === days);
    return days > 6 ? priceObject.price + 500 * (days - 6) : priceObject.price;
  };

  return (
    <div className="w-full min-h-screen bg-neutral-950 flex flex-col items-center justify-start font-montserrat">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={setSelected}
        className={`text-neutral-200 bg-neutral-800 p-8 z-10 ${
          !clicked ? "-translate-y-[25rem]" : "-translate-y-0"
        } rounded-3xl duration-300`}
        styles={{
          caption: {
            backgroundColor: "RGB(29,29,29)",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          },
        }}
      />
      <FaChevronDown
        onClick={() => setClicked(!clicked)}
        className={`text-neutral-200 text-3xl ${
          !clicked ? "-translate-y-[25rem]" : "-translate-y-0 rotate-180"
        } duration-300`}
      />
      {data &&
        data.map((item) => {
          {
            const unavailableDates = item.unavailable || [];

            const dates = formatDate(selected);

            const isDateUnavailable = formatDate(selected).some((date) =>
              unavailableDates.includes(date)
            );
            if (
              !isDateUnavailable &&
              item.city === location.pathname.replace("/katalog/", "")
            )
              return (
                <div
                  key={item.id}
                  className={`${
                    !clicked ? "-translate-y-[25rem]" : ""
                  } flex flex-col items-center justify-start bg-neutral-800 md:w-1/3 w-3/4 m-5 rounded-3xl duration-300`}
                >
                  <h1 className="m-3 mt-6 md:text-2xl text-xl font-bold text-white tracking-wider">
                    {item.name}
                  </h1>
                  <p className="font-thin text-white text-xl m-3 mt-0">
                    {item.desc}
                  </p>
                  <img className="max-h-48" src={item.image} alt={item.name} />
                  <p className="text-purple-400 font-bold tracking-wider text-3xl mt-3">
                    {calculatePrice(item, dates.length) + "din."}
                  </p>
                  <Link
                    to={
                      "/rez/" +
                      item.id +
                      "/" +
                      dates[0] +
                      "-to-" +
                      dates[dates.length - 1]
                    }
                    className="mb-6 m-3 px-5 py-2 text-white font-bold tracking-wider text-xl bg-[rgb(29,29,29)] rounded-md"
                  >
                    REZERVIŠI
                  </Link>
                </div>
              );
          }
        })}
    </div>
  );
};

export default Catalogue;
