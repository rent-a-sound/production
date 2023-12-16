import React, { useState, useEffect } from "react";
import axios from "axios";
import { eachDayOfInterval, format, parse } from "date-fns";
import { srLatn } from "date-fns/locale";
import { FaReceipt } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { TbPhoneFilled } from "react-icons/tb";
import { IoMdMicrophone } from "react-icons/io";

const Form = () => {
  const [info, setInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [animatePerson, setAnimatePerson] = useState(false);
  const [animatePhone, setAnimatePhone] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const id = window.location.href.split("/")[6];
  const dateRange = window.location.href.split("/")[7];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const successString =
    "Rezervacija poslata, bićete kontaktirani radi potvrde porudzbine.";
  const errorString = "Doslo je do greske, molim vas pokusajte ponovo.";

  const handleInfoChange = (e) => {
    setInfo(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://niledragomirovic.pythonanywhere.com/single?id=" + id
        );
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
      }
    };

    fetchData();
  }, []);

  function getDatesBetween(date1, date2, dateFormat = "dd-MM-yyyy") {
    const parsedDate1 = parse(date1, dateFormat, new Date());
    const parsedDate2 = parse(date2, dateFormat, new Date());

    const datesBetween = eachDayOfInterval({
      start: parsedDate1,
      end: parsedDate2,
    });

    const formattedDates = datesBetween.map((date) => format(date, dateFormat));

    return formattedDates;
  }

  function displayDates(date1, date2) {
    const displayDate1 = parse(date1, "dd-MM-yyyy", new Date());
    const displayDate2 = parse(date2, "dd-MM-yyyy", new Date());

    return (
      <p>
        Preuzimanje:
        <br />
        {format(displayDate1, "PPP", { locale: srLatn })}
        <br />
        <br />
        Povrat:
        <br />
        {format(displayDate2, "PPP", { locale: srLatn })}
      </p>
    );
  }

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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api.telegram.org/bot6461461088:AAGWeqWqbFZzLaRsWasiMsR8xNZ3bx2pmXM/sendMessage",
        `chat_id=${encodeURIComponent(5783597838)}&text=${encodeURIComponent(
          info +
            "\n" +
            phone +
            "\n" +
            id +
            "\n" +
            (dateRange.split("-to-")[0] === dateRange.split("-to-")[1]
              ? dateRange.split("-to-")[0]
              : dateRange.split("-to-")[0] +
                " do " +
                dateRange.split("-to-")[1]) +
            "\n" +
            calculatePrice(
              data,
              getDatesBetween(
                dateRange.split("-to-")[0],
                dateRange.split("-to-")[1]
              ).length
            ) +
            "din."
          //https://nikoladragomirovic.github.io/RentASound/#/rez/pb100-2/21-12-2023-to-23-12-2023
        )}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data);

      setSuccess(successString);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccess(errorString);
    }
  };

  return (
    <>
      <div className="bg-neutral-950 w-full min-h-screen flex flex-col items-center justify-center duration-300">
        <div
          className={`${
            success == successString
              ? "animate-jump animate-duration-500"
              : "animate-jump-in animate-duration-500"
          } ${
            success == errorString ? "animate-shake animate-duration-300" : ""
          } ${
            success == ""
              ? "outline-purple-400"
              : success == successString
                ? "outline-green-400"
                : "outline-red-400"
          } flex flex-col items-center justify-start my-24 outline-dashed duration-300 outline-1 p-10 rounded-xl`}
        >
          <FaReceipt className="text-white text-6xl font-montserrat mb-6" />
          <p className="text-3xl font-thin text-white m-2">{data.name}</p>
          <span className="text-2xl font-thin text-white text-center m-5 mb-6">
            {displayDates(
              dateRange.split("-to-")[0],
              dateRange.split("-to-")[1]
            )}
          </span>
          <IoPersonSharp
            className={`${
              animatePerson ? "animate-shake" : ""
            } text-white text-3xl font-montserrat mt-2 mb-3`}
          />
          <textarea
            onFocus={() => setAnimatePerson(true)}
            onBlur={() => setAnimatePerson(false)}
            className={`bg-neutral-950 outline-dashed font-thin ${
              success == ""
                ? "outline-purple-400"
                : success == successString
                  ? "outline-green-400"
                  : "outline-red-400"
            } outline-1 text-center placeholder-neutral-500 w-full mb-3 duration-300 resize-none outline-none pl-2 pt-2 h-10 rounded-xl text-white`}
            value={info}
            onChange={handleInfoChange}
            placeholder="Vaše ime i prezime..."
          ></textarea>
          <TbPhoneFilled
            className={`${
              animatePhone ? "animate-shake" : ""
            } text-white text-3xl font-montserrat mt-5 mb-3`}
          />
          <textarea
            onFocus={() => setAnimatePhone(true)}
            onBlur={() => setAnimatePhone(false)}
            className={`bg-neutral-950 outline-dashed font-thin outline-1 ${
              success == ""
                ? "outline-purple-400"
                : success == successString
                  ? "outline-green-400"
                  : "outline-red-400"
            } text-center placeholder-neutral-500 mb-2 w-full duration-300 resize-none outline-none pl-2 pt-2 h-10 rounded-xl text-white`}
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Vaš broj telefona..."
          ></textarea>
          <IoMdMicrophone
            className={`text-white text-4xl font-montserrat mt-8 mb-3`}
          />
          <div className="flex flex-col items-start justify-start">
            <label className="text-white font-thin text-xl">
              <input
                type="radio"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleOptionChange}
                disabled={success == successString}
                className={`mr-2 appearance-none outline-dashed outline-white p-2 rounded-xl ${
                  success == ""
                    ? "checked:outline-purple-400"
                    : success == successString
                      ? "checked:outline-green-400"
                      : "checked:outline-red-400"
                } checked:animate-rotate-y`}
              />
              JBL Žični Mikrofon - 500din.
            </label>
            <label className="text-white font-thin text-xl">
              <input
                type="radio"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleOptionChange}
                disabled={success == successString}
                className={`mr-2 appearance-none outline-dashed outline-white p-2 rounded-xl ${
                  success == ""
                    ? "checked:outline-purple-400"
                    : success == successString
                      ? "checked:outline-green-400"
                      : "checked:outline-red-400"
                } checked:animate-rotate-y`}
              />
              JBL Bežični Mikrofon - 700din.
            </label>

            <label className="text-white font-thin text-xl">
              <input
                type="radio"
                value="option3"
                checked={selectedOption === "option3"}
                disabled={success == successString}
                onChange={handleOptionChange}
                className={`mr-2 appearance-none outline-dashed outline-white p-2 rounded-xl ${
                  success == ""
                    ? "checked:outline-purple-400"
                    : success == successString
                      ? "checked:outline-green-400"
                      : "checked:outline-red-400"
                } checked:animate-rotate-y`}
              />
              Bez Mikrofona
            </label>
          </div>
          <p className="text-3xl text-white font-thin mt-10">
            {data.price
              ? calculatePrice(
                  data,
                  getDatesBetween(
                    dateRange.split("-to-")[0],
                    dateRange.split("-to-")[1]
                  ).length
                ) + "din."
              : ""}
          </p>
          <button
            className={`text-white mt-10 font-thin text-2xl py-3 px-5 duration-300 outline-dashed outline-1 rounded-xl tracking-wide ${
              success == ""
                ? "outline-purple-400"
                : success == successString
                  ? "outline-green-400"
                  : "outline-red-400"
            }`}
            disabled={success === successString}
            onClick={handleSubmit}
          >
            {success == ""
              ? "POTVRDI"
              : success == successString
                ? "POTVRDJENO"
                : "GRESKA"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
