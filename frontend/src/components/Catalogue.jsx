import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format, addDays, subDays, parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import { FaChevronDown } from "react-icons/fa";
import { srLatn } from "date-fns/locale";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { HiArrowDown } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";

const Catalogue = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState();
  const [clicked, setClicked] = useState(false);
  const [taken, setTaken] = useState(true);
  const [priceLowHigh, setPriceLowHigh] = useState(true);

  const disabledDays = [{ from: new Date(0), to: subDays(new Date(), 1) }];

  useEffect(() => {
    const handleScroll = () => {
      setClicked(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const savedSelected = localStorage.getItem("selected");
    if (savedSelected) {
      if (savedSelected == "undefined") {
      } else {
        const parsedSelected = JSON.parse(savedSelected);

        parsedSelected.from = parseISO(parsedSelected.from);
        parsedSelected.to = parseISO(parsedSelected.to);

        setSelected({
          from: parsedSelected.from,
          to: !(parsedSelected.to == "Invalid Date")
            ? parsedSelected.to
            : undefined,
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    const apiUrl = `https://niledragomirovic.pythonanywhere.com/data?city=${
      window.location.href.split("/")[6]
    }`;
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
      return ["Nije izabran", "Nije izabran"];
    }

    const fromDate = new Date(date.from);

    if (isNaN(fromDate)) {
      return ["Nije izabran", "Nije izabran"];
    }

    if (!date.to) {
      return [
        format(fromDate, "do MMM yyyy", { locale: srLatn }),
        format(addDays(fromDate, 1), "do MMM yyyy", { locale: srLatn }),
      ];
    }

    const toDate = new Date(date.to);

    if (isNaN(toDate)) {
      return ["Nije izabran", "Nije izabran"];
    }

    return [
      format(fromDate, "do MMM yyyy", { locale: srLatn }),
      format(addDays(toDate, 1), "do MMM yyyy", { locale: srLatn }),
    ];
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

  const getAvailabilityInfo = (item) => {
    const unavailableDates = item.unavailable || [];
    const dates = formatDate(selected);
    const isDateUnavailable = dates.some((date) =>
      unavailableDates.includes(date)
    );

    return { dates, isDateUnavailable };
  };

  const sortedData = data
    ? data.slice().sort((a, b) => {
        const availabilityInfoA = getAvailabilityInfo(a);
        const availabilityInfoB = getAvailabilityInfo(b);

        if (
          availabilityInfoA.isDateUnavailable &&
          !availabilityInfoB.isDateUnavailable
        ) {
          return 1;
        } else if (
          !availabilityInfoA.isDateUnavailable &&
          availabilityInfoB.isDateUnavailable
        ) {
          return -1;
        }

        const priceA = !availabilityInfoA.isDateUnavailable
          ? calculatePrice(a, selected ? formatDate(selected).length : 0)
          : 0;

        const priceB = !availabilityInfoB.isDateUnavailable
          ? calculatePrice(b, selected ? formatDate(selected).length : 0)
          : 0;

        return priceLowHigh ? priceA - priceB : priceB - priceA;
      })
    : "";

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => setClicked(!clicked)}
        className={`flex flex-col items-center justify-start fixed duration-300 bg-gradient-to-t from-neutral-800 to-neutral-900 shadow-[0_0_30px_black] outline outline-1 outline-neutral-500 rounded-xl p-4 z-10 ${
          !clicked ? "-translate-y-[22rem]" : "-translate-y-[1rem]"
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
        <div className="flex flex-row items-center w-11/12 bg-gradient-to-b mt-2 from-neutral-900 py-2 px-4 outline outline-1 rounded-md outline-neutral-600 justify-around">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setTaken(!taken);
            }}
            className="flex flex-row items-center justify-center text-white text-xl font-thin"
          >
            {!taken ? (
              <VscEye className="mr-2 text-2xl animate-jump-in" />
            ) : (
              <VscEyeClosed className="mr-2 text-2xl animate-jump-in" />
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
          className={` text-lg mt-3 font-thin flex flex-row items-center justify-start ${
            selected
              ? "text-purple-200 from-purple-900 to-violet-900 outline outline-1 outline-purple-400 bg-gradient-to-tr"
              : "text-neutral-200 from-neutral-900 outline outline-1 outline-neutral-600 bg-gradient-to-b"
          } py-1 px-3 rounded-md w-11/12 ${
            !clicked ? "-" : "-translate-y-0"
          } duration-300`}
        >
          Preuzimanje <BiSolidRightArrow className="mx-2 text-xs" />
          {displayDate(selected)[0]}
        </span>
        <span
          className={` text-lg mt-3 font-thin flex flex-row items-center justify-start ${
            selected
              ? "text-purple-200 from-purple-900 to-violet-900 outline outline-1 outline-purple-400 bg-gradient-to-tr"
              : "text-neutral-200 from-neutral-900 outline outline-1 outline-neutral-600 bg-gradient-to-b"
          } py-1 px-3 rounded-md w-11/12 ${
            !clicked ? "-" : "-translate-y-0"
          } duration-300`}
        >
          Povrat <BiSolidRightArrow className="duration-300 mx-2 text-xs" />
          {displayDate(selected)[1]}
        </span>
        <FaChevronDown
          className={`text-neutral-200 text-3xl ${
            !clicked ? "" : "-translate-y-0 rotate-180"
          } duration-300 mt-3 -mb-1`}
        />
      </div>
      <div
        className={`w-full min-h-screen bg-neutral-950 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-6 py-5 pt-36 pb-16 font-montserrat text-center`}
      >
        {sortedData &&
          sortedData.map((item, index) => {
            {
              const { dates, isDateUnavailable } = getAvailabilityInfo(item);
              const toLink = `/rez/${item.id}/${dates[0]}-to-${
                dates[dates.length - 1]
              }`;
              if (!taken || !isDateUnavailable)
                return (
                  <Link
                    to={selected && !isDateUnavailable ? toLink : null}
                    onClick={() => {
                      if (!(selected && !isDateUnavailable)) {
                        setClicked(!clicked);
                      }
                    }}
                    key={index}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={`flex flex-col items-center justify-start mx-5 my-5 h-fit bg-gradient-to-b outline outline-1 outline-neutral-500 from-neutral-900 to-neutral-950 rounded-2xl duration-500 animate-fade-down`}
                  >
                    <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 mt-8 mb-8 w-5/6 rounded-3xl outline outline-1 outline-neutral-500">
                      <h1 className="mb-3 mt-5 mx-4 text-2xl font-bold tracking-wider text-white">
                        {item.name}
                      </h1>
                      <p className="font-thin text-white text-xl mb-3 mx-4 mt-0">
                        {item.battery
                          ? "Ugradjena Baterija"
                          : "Bez Ugradjene Baterije"}
                      </p>
                      <p className="font-thin text-white text-xl m-3 mb-5 mt-0">
                        {item.desc}
                      </p>
                    </div>
                    <img
                      className="max-h-56"
                      src={item.image}
                      alt={item.name}
                    />
                    <span
                      className={`${
                        selected ? "opacity-100 mb-10" : "opacity-0 -mb-16"
                      } ${
                        isDateUnavailable
                          ? "text-neutral-400 outline-neutral-500 from-neutral-800 to-neutral-900"
                          : "text-purple-200 outline-purple-400 from-purple-800 to-violet-900"
                      } tracking-wider text-3xl font-thin mt-8 duration-300 outline outline-1 bg-gradient-to-b rounded-3xl py-2 px-6`}
                    >
                      {isDateUnavailable
                        ? "Zauzet"
                        : calculatePrice(item, dates.length) + "din."}
                    </span>
                  </Link>
                );
              return null;
            }
          })}
      </div>
    </div>
  );
};

export default Catalogue;
