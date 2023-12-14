import React, { useState, useEffect } from "react";
import axios from "axios";
import { eachDayOfInterval, format, parse } from "date-fns";
import { srLatn } from "date-fns/locale";
import { FaReceipt } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { TbPhoneFilled } from "react-icons/tb";
import bg from "../public/bg.png";

const Form = () => {
  const [info, setInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [animatePerson, setAnimatePerson] = useState(false);
  const [animatePhone, setAnimatePhone] = useState(false);

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
          "http://127.0.0.1:5000/single?id=" + location.pathname.split("/")[2]
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

  function calculatePrice(data, days) {
    return data.price[days]
      ? data.price[days].price
      : data.price[data.price.length - 1].price +
          (days - data.price.length + 1) * data.overdraft;
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api.telegram.org/bot6461461088:AAGWeqWqbFZzLaRsWasiMsR8xNZ3bx2pmXM/sendMessage",
        `chat_id=${encodeURIComponent(5783597838)}&text=${encodeURIComponent(
          info +
            "\n" +
            phone +
            "\n" +
            location.pathname.split("/")[2] +
            "\n" +
            (location.pathname.split("/")[3].split("-to-")[0] ===
            location.pathname.split("/")[3].split("-to-")[1]
              ? location.pathname.split("/")[3].split("-to-")[0]
              : location.pathname.split("/")[3].split("-to-")[0] +
                " do " +
                location.pathname.split("/")[3].split("-to-")[1]) +
            "\n" +
            calculatePrice(
              data,
              getDatesBetween(
                location.pathname.split("/")[3].split("-to-")[0],
                location.pathname.split("/")[3].split("-to-")[1]
              ).length
            ) +
            "din."
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
      <div
        style={{
          backgroundImage: `url(${bg})`,
        }}
        className="z-0 w-full h-screen absolute animate-pulse"
      ></div>
      <div className="bg-neutral-950 w-full min-h-screen flex flex-col items-center justify-center duration-300">
        <div
          className={`${
            success == successString || success == errorString
              ? "animate-shake animate-duration-300"
              : "animate-jump-in animate-duration-500"
          } flex flex-col items-center justify-start my-24 outline-dashed duration-300 outline-1 outline-white p-10 rounded-xl`}
        >
          <FaReceipt className="text-white text-6xl font-montserrat mb-6" />
          <p className="text-3xl font-thin text-white m-2">{data.name}</p>
          <span className="text-2xl font-thin text-white text-center m-5 mb-6">
            {displayDates(
              location.pathname.split("/")[3].split("-to-")[0],
              location.pathname.split("/")[3].split("-to-")[1]
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
            className="bg-neutral-950 outline-dashed font-thin outline-purple-400 outline-1 text-center placeholder-neutral-500 w-full mb-3 resize-none outline-none pl-2 pt-2 h-10 rounded-xl text-white"
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
            className="bg-neutral-950 outline-dashed font-thin outline-1 outline-purple-400 text-center placeholder-neutral-500 mb-2 w-full resize-none outline-none pl-2 pt-2 h-10 rounded-xl text-white"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Vaš broj telefona..."
          ></textarea>
          <p className="text-3xl text-white font-thin mt-10">
            {data.price
              ? calculatePrice(
                  data,
                  getDatesBetween(
                    location.pathname.split("/")[3].split("-to-")[0],
                    location.pathname.split("/")[3].split("-to-")[1]
                  ).length
                ) + "din."
              : ""}
          </p>
          <button
            className={`text-white mt-10 duration-300 font-thin text-2xl py-3 px-5 outline-dashed ${
              success == successString ? "outline-white" : "outline-purple-400"
            } outline-1 rounded-xl tracking-wide`}
            disabled={success === successString}
            onClick={handleSubmit}
          >
            POTVRDI
          </button>
        </div>
        <p
          className={`text-white font-thin text-center mx-8 duration-500 ${
            success === successString || success === errorString
              ? "-translate-y-20 opacity-100"
              : "translate-y-96 opacity-0"
          }`}
        >
          {success}
        </p>
      </div>
    </>
  );
};

export default Form;
