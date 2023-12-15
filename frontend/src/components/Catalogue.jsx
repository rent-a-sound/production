import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format, addDays, subDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import { FaChevronDown } from "react-icons/fa";
import { srLatn } from "date-fns/locale";
import { FaBookmark } from "react-icons/fa6";

const Catalogue = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState();
  const [clicked, setClicked] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState([]);

  const disabledDays = [{ from: new Date(0), to: subDays(new Date(), 1) }];

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        setItemsPerRow([0, 1, 2]);
      } else if (screenWidth >= 768) {
        setItemsPerRow([0, 1]);
      } else {
        setItemsPerRow([0]);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:5000/data?city=${location.pathname.replace(
      "/katalog/",
      ""
    )}`;
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

  const displayDate = (date) => {
    if (!date || !date.from) {
      return "Nije izabran datum";
    }

    const fromDate = new Date(date.from);

    if (isNaN(fromDate)) {
      return "Nije izabran datum";
    }

    if (!date.to) {
      return (
        <p>
          Preuzimanje | {format(fromDate, "PPP", { locale: srLatn })}
          <br />
          Povrat | {format(addDays(fromDate, 1), "PPP", { locale: srLatn })}
        </p>
      );
    }

    const toDate = new Date(date.to);

    if (isNaN(toDate)) {
      return "Nije izabran datum";
    }

    return (
      <p>
        Preuzimanje | {format(fromDate, "PPP", { locale: srLatn })}
        <br />
        Povrat | {format(addDays(toDate, 1), "PPP", { locale: srLatn })}
      </p>
    );
  };

  const calculatePrice = (speaker, days) => {
    const priceObject =
      days > speaker.price.length - 1
        ? speaker.price.find((item) => item.day === speaker.price.length - 1)
        : speaker.price.find((item) => item.day === days);
    return days > speaker.price.length
      ? priceObject.price +
          speaker.overdraft * (days - speaker.price.length + 1)
      : priceObject.price;
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex flex-col items-center justify-start fixed duration-300 bg-neutral-800 outline outline-[1px] outline-neutral-400 scale-95 rounded-xl p-4 z-10 ${
          !clicked ? "-translate-y-[24rem]" : "-translate-y-[1.5rem]"
        }`}
      >
        <DayPicker
          mode="range"
          locale={srLatn}
          selected={selected}
          onSelect={setSelected}
          className={`text-neutral-200 bg-neutral-800 p-8 z-10 rounded-3xl duration-300`}
          disabled={disabledDays}
        />
        <span
          onClick={() => setClicked(!clicked)}
          className={`text-neutral-200 text-lg mt-6 font-thin ${
            !clicked ? "-" : "-translate-y-0"
          } duration-300`}
        >
          {displayDate(selected)}
        </span>
        <FaChevronDown
          onClick={() => setClicked(!clicked)}
          className={`text-neutral-200 text-3xl ${
            !clicked ? "" : "-translate-y-0 rotate-180"
          } duration-300 mt-2`}
        />
      </div>
      <div
        className={`w-full min-h-screen bg-neutral-950 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-6 py-5 font-montserrat text-center`}
      >
        {data &&
          data.map((item, index) => {
            {
              const unavailableDates = item.unavailable || [];

              const dates = formatDate(selected);

              const isDateUnavailable = formatDate(selected).some((date) =>
                unavailableDates.includes(date)
              );
              if (!isDateUnavailable)
                return (
                  <div
                    onClick={() => {
                      if (selected) {
                        window.location.href =
                          "/rez/" +
                          item.id +
                          "/" +
                          dates[0] +
                          "-to-" +
                          dates[dates.length - 1];
                      }
                    }}
                    key={index}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={`${
                      index in itemsPerRow ? "mt-36" : "mt-0"
                    } flex flex-col items-center justify-start mx-5 my-10 h-fit bg-gradient-to-b from-neutral-800 rounded-3xl duration-500 animate-fade-down`}
                  >
                    <h1 className="m-3 mt-6 md:text-2xl text-xl font-bold text-white tracking-wider">
                      {item.name}
                    </h1>
                    <p className="font-thin text-white text-xl m-3 mt-0">
                      {item.battery
                        ? "Ugradjena Baterija"
                        : "Bez Ugradjene Baterije"}
                    </p>
                    <p className="font-thin text-white text-xl m-3 mt-0">
                      {item.desc}
                    </p>
                    <img
                      className="max-h-48"
                      src={item.image}
                      alt={item.name}
                    />
                    <p
                      className={`${
                        selected ? "opacity-100 mb-10" : "opacity-0 -mb-10"
                      } text-purple-400 tracking-wider text-4xl font-thin mt-8 duration-300`}
                    >
                      {calculatePrice(item, dates.length) + "din."}
                    </p>
                  </div>
                );
              return null;
            }
          })}
      </div>
    </div>
  );
};

export default Catalogue;
