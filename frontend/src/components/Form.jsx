import React, { useState, useEffect } from "react";
import axios from "axios";
import { eachDayOfInterval, format, parse } from "date-fns";

const Form = () => {
  const [info, setInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

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

  function calculatePrice(data, days) {
    return data.price[days]
      ? price[days].price
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

      setSuccess(
        "Rezervacija poslata, bićete kontaktirani radi potvrde porudzbine."
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccess(
        "Doslo je do greske, molim vas proverite podatke i pokusajte ponovo."
      );
    }
  };

  return (
    <div className="bg-neutral-950 w-full min-h-screen flex flex-col items-center">
      <h1 className="text-white font-bold text-6xl font-montserrat mt-20 mb-6">
        REZERVIŠI
      </h1>
      <p className="text-xl text-white">{data.name}</p>
      <p className="text-xl text-white">
        {data.price
          ? calculatePrice(
              data,
              getDatesBetween(
                location.pathname.split("/")[3].split("-to-")[0],
                location.pathname.split("/")[3].split("-to-")[1]
              ).length
            )
          : ""}
      </p>
      <textarea
        className="bg-neutral-800 m-10 mb-4 md:w-1/2 w-3/4 resize-none outline-none pl-2 pt-2 h-10 rounded-xl text-white"
        value={info}
        onChange={handleInfoChange}
        placeholder="Vaše ime i prezime..."
      ></textarea>
      <textarea
        className="bg-neutral-800 m-10 mb-4 md:w-1/2 w-3/4 resize-none outline-none pl-2 pt-2 h-10 rounded-xl text-white"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Vaš broj telefona..."
      ></textarea>
      <p className="text-white">{success}</p>
      <button
        className="text-white"
        disabled={
          success ===
          "Rezervacija poslata, bićete kontaktirani radi potvrde porudzbine."
        }
        onClick={handleSubmit}
      >
        REZ
      </button>
    </div>
  );
};

export default Form;
