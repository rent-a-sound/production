import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format, addDays, subDays, isDate } from "date-fns";
import { DayPicker } from "react-day-picker";
import { FaChevronDown } from "react-icons/fa";
import { srLatn } from "date-fns/locale";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { HiArrowDown } from "react-icons/hi2";

const Catalogue = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState();
  const [clicked, setClicked] = useState(false);
  const [taken, setTaken] = useState(true);
  const [priceLowHigh, setPriceLowHigh] = useState(true);

  const disabledDays = [{ from: new Date(0), to: subDays(new Date(), 1) }];

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
      days > speaker.price.length
        ? speaker.price.find((item) => item.day === speaker.price.length)
        : speaker.price.find((item) => item.day === days);
    return days == 0
      ? 0
      : days > speaker.price.length
        ? priceObject.price + speaker.overdraft * (days - speaker.price.length)
        : priceObject.price;
  };

  const sortedData = data
    ? data.slice().sort((a, b) => {
        const priceA = calculatePrice(
          a,
          selected ? formatDate(selected).length : 0
        );
        const priceB = calculatePrice(
          b,
          selected ? formatDate(selected).length : 0
        );
        return priceLowHigh ? priceA - priceB : priceB - priceA;
      })
    : "";

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => setClicked(!clicked)}
        className={`flex flex-col items-center justify-start fixed duration-300 bg-gradient-to-t from-neutral-800 to-neutral-950 shadow-[0_0_30px_black] outline outline-[1px] outline-neutral-400 rounded-xl p-4 z-10 ${
          !clicked ? "-translate-y-[26rem]" : "-translate-y-[1.5rem]"
        }`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DayPicker
            mode="range"
            locale={srLatn}
            selected={selected}
            onSelect={setSelected}
            className={`text-neutral-200 pt-8 z-10 font-thin rounded-3xl duration-300`}
            disabled={disabledDays}
          />
        </div>
        <div className="flex flex-row items-center w-3/4 bg-gradient-to-b from-neutral-900 py-2 px-4 outline outline-[0.5px] rounded-md outline-neutral-400 justify-between">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setTaken(!taken);
            }}
            className="flex flex-row items-center justify-center text-white text-xl font-thin"
          >
            {!taken ? (
              <VscEye className="mr-2 text-2xl animate-fade-left" />
            ) : (
              <VscEyeClosed className="mr-2 text-2xl animate-fade-left" />
            )}
            ZAUZETI
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setPriceLowHigh(!priceLowHigh);
            }}
            className="flex flex-row items-center justify-center text-white text-xl font-thin"
          >
            <HiArrowDown
              className={`mr-2 text-xl duration-300 ${
                !priceLowHigh ? "" : "rotate-180"
              }`}
            />{" "}
            CENA
          </div>
        </div>
        <span
          className={`text-neutral-200 text-lg mt-8 font-thin ${
            !clicked ? "-" : "-translate-y-0"
          } duration-300`}
        >
          {displayDate(selected)}
        </span>
        <FaChevronDown
          className={`text-neutral-200 text-3xl ${
            !clicked ? "" : "-translate-y-0 rotate-180"
          } duration-300 mt-2 -mb-1`}
        />
      </div>
      <div
        className={`w-full min-h-screen bg-neutral-950 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-6 py-5 pt-36 font-montserrat text-center`}
      >
        {sortedData &&
          sortedData.map((item, index) => {
            {
              const unavailableDates = item.unavailable || [];

              const dates = formatDate(selected);

              const isDateUnavailable = formatDate(selected).some((date) =>
                unavailableDates.includes(date)
              );
              if (!taken || !isDateUnavailable)
                return (
                  <div
                    onClick={() => {
                      if (selected && !isDateUnavailable) {
                        window.location.href =
                          "/rez/" +
                          item.id +
                          "/" +
                          dates[0] +
                          "-to-" +
                          dates[dates.length - 1];
                      } else {
                        setClicked(!clicked);
                      }
                    }}
                    key={index}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={`flex flex-col items-center justify-start mx-5 my-5 h-fit bg-gradient-to-b outline outline-[0.5px] outline-neutral-400 from-neutral-800 rounded-3xl duration-500 animate-fade-down`}
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
                    <span
                      className={`${
                        selected ? "opacity-100 mb-10" : "opacity-0 -mb-10"
                      } ${
                        isDateUnavailable
                          ? "text-neutral-400"
                          : "text-purple-400"
                      } tracking-wider text-4xl font-thin mt-8 duration-300`}
                    >
                      {isDateUnavailable
                        ? "Zauzet"
                        : calculatePrice(item, dates.length) + "din."}
                    </span>
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
