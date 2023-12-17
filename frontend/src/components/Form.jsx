import React, { useState, useEffect } from "react";
import axios from "axios";
import { eachDayOfInterval, format, parse } from "date-fns";
import { srLatn } from "date-fns/locale";
import { FaReceipt } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { TbPhoneFilled } from "react-icons/tb";
import { IoMdMicrophone } from "react-icons/io";
import { Link } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

const Form = () => {
  const [info, setInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(null);
  const [data, setData] = useState({});
  const [animatePerson, setAnimatePerson] = useState(false);
  const [animatePhone, setAnimatePhone] = useState(false);

  const micMap = {
    "Bez mikrofona": 0,
    "Žični mikrofon": 500,
    "Bežični mikrofon": 700,
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const id = window.location.href.split("/")[6];
  const dateRange = window.location.href.split("/")[7];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInfoChange = (e) => {
    const formattedValue = e.target.value.replace(
      /[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s]/g,
      ""
    );
    setInfo(formattedValue);
  };

  const handlePhoneChange = (e) => {
    const formattedValue = e.target.value.replace(/[^\d+]/g, "");
    setPhone(formattedValue.slice(0, 14));
  };

  const generateImage = () => {
    const linkElement = document.getElementById("link");

    const originalButtonText = linkElement.textContent;

    linkElement.textContent = "POTVRDJENO";

    const receiptDiv = document.getElementById("receipt");
    const paragraphElement = receiptDiv.querySelector("p.text-lg");

    const originalDisplayStyle = paragraphElement.style.display;

    paragraphElement.style.display = "none";

    htmlToImage
      .toPng(receiptDiv)
      .then(function (dataUrl) {
        download(dataUrl, "račun-rent-a-sound.png");

        paragraphElement.style.display = originalDisplayStyle;

        linkElement.textContent = originalButtonText;
      })
      .catch((error) => {
        paragraphElement.style.display = originalDisplayStyle;
        linkElement.textContent = originalButtonText;
      });
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
        ? priceObject.price +
          speaker.overdraft * (days - speaker.price.length) +
          (selectedOption ? micMap[selectedOption] : 0)
        : priceObject.price + (selectedOption ? micMap[selectedOption] : 0);
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
            selectedOption +
            "\n" +
            calculatePrice(
              data,
              getDatesBetween(
                dateRange.split("-to-")[0],
                dateRange.split("-to-")[1]
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

      setSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccess(false);
    }
  };

  return (
    <>
      <div className="bg-neutral-950 w-full min-h-screen flex flex-col items-center justify-center duration-300">
        <div className="p-4 bg-neutral-950 rounded-3xl max-h-fit" id="receipt">
          <div
            className={`${
              success == true
                ? "animate-jump animate-duration-500"
                : "animate-jump-in animate-duration-500"
            } ${success == false ? "animate-shake animate-duration-300" : ""} ${
              success == null
                ? "outline-purple-400"
                : success == true
                  ? "outline-green-400"
                  : "outline-red-400"
            } flex flex-col items-center justify-start outline-dashed duration-300 my-12 outline-1 p-10 rounded-xl`}
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
            <input
              autoComplete="off"
              onFocus={() => setAnimatePerson(true)}
              onBlur={() => setAnimatePerson(false)}
              className={`bg-neutral-950 outline-dashed font-thin ${
                success == null
                  ? "outline-purple-400"
                  : success == true
                    ? "outline-green-400"
                    : "outline-red-400"
              } outline-1 text-center placeholder-neutral-500 w-full mb-3 duration-300 resize-none outline-none h-10 rounded-xl text-white`}
              value={info}
              onChange={handleInfoChange}
              onInput={handleInfoChange}
              readOnly={success == true}
              placeholder="Vaše ime i prezime..."
            ></input>
            <TbPhoneFilled
              className={`${
                animatePhone ? "animate-shake" : ""
              } text-white text-3xl font-montserrat mt-5 mb-3`}
            />
            <input
              autoComplete="off"
              onFocus={() => setAnimatePhone(true)}
              onBlur={() => setAnimatePhone(false)}
              inputMode="numeric"
              type="tel"
              className={`bg-neutral-950 appearance-none m-0 outline-dashed font-thin outline-1 ${
                success == null
                  ? "outline-purple-400"
                  : success == true
                    ? "outline-green-400"
                    : "outline-red-400"
              } text-center placeholder-neutral-500 mb-2 w-full duration-300 resize-none outline-none h-10 rounded-xl text-white`}
              value={phone}
              onChange={handlePhoneChange}
              onInput={handlePhoneChange}
              readOnly={success == true}
              placeholder="Vaš broj telefona..."
            ></input>
            <IoMdMicrophone
              className={`text-white text-4xl font-montserrat mt-8 mb-1`}
            />
            <label
              className={`font-thin flex flex-col items-center duration-300 text-white p-2 outline-1 justify-center h-10 text-lg w-full text-center rounded-xl m-2 outline-dashed ${
                selectedOption == "Žični mikrofon"
                  ? success == null
                    ? "outline-purple-400"
                    : success == true
                      ? "outline-green-400"
                      : "outline-red-400"
                  : "outline-white"
              }`}
            >
              <input
                type="radio"
                value="Žični mikrofon"
                checked={selectedOption === "Žični mikrofon"}
                onChange={handleOptionChange}
                disabled={success == true}
                className="appearance-none"
              />
              JBL Žični Mikrofon
            </label>
            <label
              className={`font-thin flex flex-col items-center duration-300 p-2 text-white outline-1 justify-center text-lg h-10 w-full text-center rounded-xl m-2 outline-dashed ${
                selectedOption == "Bežični mikrofon"
                  ? success == null
                    ? "outline-purple-400 "
                    : success == true
                      ? "outline-green-400"
                      : "outline-red-400"
                  : "outline-white"
              }`}
            >
              <input
                type="radio"
                value="Bežični mikrofon"
                checked={selectedOption === "Bežični mikrofon"}
                onChange={handleOptionChange}
                disabled={success == true}
                className="appearance-none"
              />
              JBL Bežični Mikrofon
            </label>

            <label
              className={`font-thin flex flex-col p-2 items-center duration-300 outline-1 text-white justify-center text-lg h-10 w-full text-center rounded-xl m-2 outline-dashed ${
                selectedOption == "Bez mikrofona"
                  ? success == null
                    ? "outline-purple-400 "
                    : success == true
                      ? "outline-green-400"
                      : "outline-red-400"
                  : "outline-white"
              }`}
            >
              <input
                type="radio"
                value="Bez mikrofona"
                checked={selectedOption === "Bez mikrofona"}
                disabled={success == true}
                onChange={handleOptionChange}
                className="appearance-none"
              />
              Bez Mikrofona
            </label>
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
            <Link
              id="link"
              className={`text-white mt-10 font-thin text-xl py-3 px-5 duration-300 outline-dashed outline-1 rounded-xl tracking-wide ${
                success == null
                  ? !info.trim() ||
                    (phone.startsWith("+")
                      ? phone.length < 12
                      : phone.length < 9) ||
                    !selectedOption
                    ? "outline-neutral-400"
                    : "outline-purple-400"
                  : success == true
                    ? "outline-green-400"
                    : "outline-red-400"
              }`}
              to={success == true ? "/" : null}
              onClick={
                success === true ||
                !info.trim() ||
                (phone.startsWith("+")
                  ? phone.length < 12
                  : phone.length < 9) ||
                !selectedOption
                  ? null
                  : handleSubmit
              }
            >
              {success == null
                ? "POTVRDI"
                : success == true
                  ? "NAZAD NA POČETNU"
                  : "GREŠKA"}
            </Link>
            {success == true ? (
              <p
                onClick={generateImage}
                className="text-white text-lg font-thin mt-8 underline underline-offset-2 duration-300"
              >
                Sačuvaj Račun
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
