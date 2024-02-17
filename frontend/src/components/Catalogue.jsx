import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format, addDays, subDays, parseISO } from "date-fns";
import { DayPicker } from "react-day-picker";
import { srLatn } from "date-fns/locale";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { HiArrowDown } from "react-icons/hi2";
import { PiCaretDownLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";
import { RiBattery2Fill } from "react-icons/ri";
import { LuText } from "react-icons/lu";
import { PiArrowUpRightThin } from "react-icons/pi";

const Catalogue = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState();
  const [clicked, setClicked] = useState(false);
  const [taken, setTaken] = useState(true);
  const [priceLowHigh, setPriceLowHigh] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [specialDates, setSpecialDates] = useState([]);

  const city = window.location.href.split("/")[4];

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  //Disable days that passed
  const disabledDays = [{ from: new Date(0), to: subDays(new Date(), 1) }];

  //Pull dropdown menu back up when scroll starts
  useEffect(() => {
    const handleScroll = () => {
      setClicked(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //Save previously selected dates in cookies
  useEffect(() => {
    const savedSelected = localStorage.getItem("selected");
    if (savedSelected) {
      if (savedSelected == "undefined") {
      } else {
        const parsedSelected = JSON.parse(savedSelected);

        parsedSelected.from = parseISO(parsedSelected.from);

        if (parsedSelected.from < subDays(new Date(), 1)) return;

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

  //Update cookies when selected dates changed
  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));

    const regex = /^(01-05|31-12)-20\d{2}$/;
    const dates = formatDate(selected);
    setSpecialDates(dates.filter((items) => regex.test(items)));
  }, [selected]);

  //Get all speakers in a particular city
  useEffect(() => {
    const apiUrl = `https://api.zvucnici.com/data?city=${city}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [selected]);

  //Returns list of dates from starting to ending date in dd-MM-yyyy format
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

  //Formats selected dates in readable format, uses placeholder text when no dates selected
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

  //Calculate price based on speaker and rent length
  const calculatePrice = (speaker, dates) => {
    const priceObject =
      dates.length > speaker.price.length
        ? speaker.price.find((item) => item.day === speaker.price.length)
        : speaker.price.find((item) => item.day === dates.length);
    return dates.length == 0
      ? 0
      : dates.length > speaker.price.length
        ? priceObject.price +
          speaker.overdraft * (dates.length - speaker.price.length) +
          speaker.price[0].price * specialDates.length
        : priceObject.price + speaker.price[0].price * specialDates.length;
  };

  //Check if one of the selected dates overlaps with dates in "unavailable" field for each speaker
  const getAvailabilityInfo = (item) => {
    const unavailableDates = item.unavailable || [];
    const dates = formatDate(selected);
    const isDateUnavailable = dates.some((date) =>
      unavailableDates.includes(date),
    );

    return { dates, isDateUnavailable };
  };

  //Sorts speakers by price low/high
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
          ? calculatePrice(a, formatDate(selected))
          : 0;

        const priceB = !availabilityInfoB.isDateUnavailable
          ? calculatePrice(b, formatDate(selected))
          : 0;

        return priceLowHigh ? priceA - priceB : priceB - priceA;
      })
    : "";

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={() => {
          setClicked(!clicked);
        }}
        className={`fixed z-10 flex w-11/12 flex-col items-center justify-start rounded-b-3xl bg-[rgba(0,0,0,0.1)] p-4 pb-1 outline outline-1 outline-neutral-700 backdrop-blur-lg backdrop-filter duration-300 sm:w-fit ${
          !clicked
            ? "-translate-y-[33rem] md:-translate-y-[26rem]"
            : "-translate-y-[1rem]"
        }`}
      >
        <div
          className={`my-4 flex w-11/12 items-center justify-center rounded-md bg-neutral-900 outline outline-1 outline-neutral-700`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DayPicker
            mode="range"
            locale={srLatn}
            selected={selected}
            onSelect={setSelected}
            className={`z-10 px-10 font-thin text-neutral-200 duration-300 ${
              screenWidth < 400
                ? screenWidth < 360
                  ? "scale-75"
                  : "scale-90"
                : ""
            }`}
            disabled={disabledDays}
            numberOfMonths={screenWidth < 1280 ? 1 : 2}
          />
        </div>
        <div className="mb-5 flex w-11/12 flex-row items-center justify-around rounded-md bg-neutral-900 px-4 py-2.5 outline outline-1 outline-neutral-700">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setTaken(!taken);
            }}
            className="text-md flex flex-row items-center justify-center font-thin text-white"
          >
            {!taken ? (
              <VscEye className="mr-2 animate-jump-in text-xl" />
            ) : (
              <VscEyeClosed className="mr-2 animate-jump-in text-xl" />
            )}
            ZAUZETI
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setPriceLowHigh(!priceLowHigh);
            }}
            className="text-md flex flex-row items-center justify-center font-thin text-white"
          >
            <HiArrowDown
              className={`text-md mr-2 duration-300 ${
                !priceLowHigh ? "" : "rotate-180"
              }`}
            />{" "}
            CENA
          </div>
        </div>
        <span
          className={`text-md mt-3 flex flex-row items-center justify-center bg-neutral-900 font-thin outline outline-1 outline-neutral-700 ${
            selected ? "text-neutral-200" : "text-neutral-400"
          } w-11/12 rounded-md px-3 py-1.5 duration-300 md:w-11/12`}
        >
          Preuzimanje <BiSolidRightArrow className="mx-2 text-xs" />
          {displayDate(selected)[0]}
        </span>
        <span
          className={` text-md mt-3 flex flex-row items-center justify-center bg-neutral-900  font-thin outline outline-1 outline-neutral-700 ${
            selected ? "text-neutral-200" : "text-neutral-400"
          } w-11/12 rounded-md px-3 py-1.5 duration-300 md:w-11/12`}
        >
          Povrat <BiSolidRightArrow className="mx-2 text-xs duration-300" />
          {displayDate(selected)[1]}
        </span>
        <PiCaretDownLight
          className={`text-3xl text-neutral-400 ${
            clicked ? "-translate-y-0 rotate-180" : ""
          } mb-2 mt-5 duration-300 md:mb-0 md:mt-2`}
        />
      </div>
      <div
        className={`grid min-h-screen w-full grid-cols-1 bg-neutral-950 px-2 pb-8 pt-16 text-center font-montserrat md:grid-cols-2 md:px-10 md:pt-40 lg:grid-cols-3`}
      >
        {sortedData &&
          sortedData.map((item, index) => {
            {
              const { dates, isDateUnavailable } = getAvailabilityInfo(item);
              const toLink = {
                pathname: "/rez",
                search:
                  "?id=" +
                  item.id +
                  "&from=" +
                  dates[0] +
                  "&to=" +
                  dates[dates.length - 1],
              };
              if (!taken || !isDateUnavailable)
                return (
                  <div
                    key={index}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`m-4 flex h-fit animate-fade-down flex-col items-center justify-start rounded-2xl outline outline-1 outline-neutral-700 duration-500`}
                  >
                    <div className="w-full px-6 pt-6">
                      <div
                        style={{ animationDelay: `${index * 200}ms` }}
                        className="w-full animate-fade-down rounded-3xl bg-neutral-900 py-1 outline outline-1 outline-neutral-700"
                      >
                        <h1 className="mx-4 mb-3 mt-3 text-2xl font-bold tracking-wider text-white">
                          {item.name}
                        </h1>
                        <div className="mx-6 mb-3 flex flex-row items-center justify-center">
                          <RiBattery2Fill
                            className={`min-h-[1.5rem] min-w-[1.5rem] ${
                              item.battery
                                ? "text-green-500"
                                : "text-neutral-400"
                            }`}
                          />
                          <p className="ml-2 mt-0 text-lg font-thin text-white">
                            {item.battery
                              ? "Ugradjena Baterija"
                              : "Bez Ugradjene Baterije"}
                          </p>
                        </div>
                        <Link
                          to={item.info}
                          target="_blank"
                          rel="noopener noreferrer"
                          name="info"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="m-3 flex flex-row items-center justify-center"
                        >
                          <LuText className="min-h-[1.5rem] min-w-[1.5rem] text-neutral-400" />
                          <p className="ml-2 text-lg font-thin text-white">
                            Specifikacije
                          </p>
                          <PiArrowUpRightThin className="ml-0.5 text-white" />
                        </Link>
                      </div>
                    </div>
                    <img
                      style={{ animationDelay: `${index * 300}ms` }}
                      className="mb-4 mt-6 max-h-56 animate-fade-down"
                      src={item.image}
                      alt={item.name}
                    />
                    <Link
                      to={selected && !isDateUnavailable ? toLink : null}
                      onClick={() => {
                        if (!(selected && !isDateUnavailable)) {
                          setClicked(!clicked);
                        }
                      }}
                      className="w-full px-6 pb-6"
                    >
                      <div
                        style={{ animationDelay: `${index * 400}ms` }}
                        className={`${
                          isDateUnavailable || !selected
                            ? "text-neutral-400"
                            : "relative text-white shadow"
                        } animate-fade-down rounded-2xl bg-neutral-900 px-4 py-3 text-xl font-thin tracking-wider outline outline-1 outline-neutral-700 duration-700`}
                      >
                        {isDateUnavailable
                          ? "Zauzet"
                          : calculatePrice(item, dates) == 0
                            ? "Izaberi datum"
                            : `Rezerviši - ${calculatePrice(item, dates)} RSD`}
                      </div>
                    </Link>
                    <p
                      className={`text-sm font-extralight text-neutral-400 duration-500 ${specialDates.length > 0 ? "-translate-y-3 opacity-100" : "h-0 opacity-0"}`}
                    >
                      Cena za
                      {" " + specialDates + " "}
                      obračunava se duplo
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
