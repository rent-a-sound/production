import React, { useState, useEffect } from "react";
import axios from "axios";
import { eachDayOfInterval, format, parse } from "date-fns";
import { srLatn } from "date-fns/locale";
import { FaReceipt } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { TbPhoneFilled } from "react-icons/tb";
import { IoMdMicrophone } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { BiSolidRightArrow } from "react-icons/bi";

const Form = () => {
  const [info, setInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(null);
  const [data, setData] = useState({});
  const [animatePerson, setAnimatePerson] = useState(false);
  const [animatePhone, setAnimatePhone] = useState(false);
  const [animateMic, setAnimateMic] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const micMap = {
    "Bez mikrofona": 0,
    "Žični mikrofon": 500,
    "Bežični mikrofon": 700,
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const fromDate = queryParams.get("from");
  const toDate = queryParams.get("to");

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
    const parsedDate1 = date1
      ? parse(date1, dateFormat, new Date())
      : new Date();
    const parsedDate2 = date2
      ? parse(date2, dateFormat, new Date())
      : new Date();

    const datesBetween = eachDayOfInterval({
      start: parsedDate1,
      end: parsedDate2,
    });

    const formattedDates = datesBetween.map((date) => format(date, dateFormat));

    return formattedDates;
  }

  function displayDates(date1, date2) {
    const displayDate1 = date1
      ? parse(date1, "dd-MM-yyyy", new Date())
      : new Date();
    const displayDate2 = date2
      ? parse(date2, "dd-MM-yyyy", new Date())
      : new Date();

    return (
      <div>
        <span className="flex sm:flex-row flex-col items-center justify-center pb-8">
          <p className="text-2xl">Preuzimanje</p>
          <BiSolidRightArrow className="text-xs my-2 sm:mx-2 rotate-90 sm:rotate-0" />
          {format(displayDate1, "PPP", { locale: srLatn })}
        </span>
        <span className="flex sm:flex-row flex-col items-center justify-center">
          <p className="text-2xl">Povrat</p>
          <BiSolidRightArrow className="text-xs my-2 sm:mx-2 rotate-90 sm:rotate-0" />
          {format(displayDate2, "PPP", { locale: srLatn })}
        </span>
      </div>
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

  function checkAllInputs() {
    if (
      !info.trim() ||
      (phone.startsWith("+") ? phone.length < 12 : phone.length < 9) ||
      !selectedOption
    ) {
      return false;
    }
    return true;
  }

  const handleSubmit = async () => {
    try {
      if (!checkAllInputs()) {
        throw new Error("Wrong Inputs");
      }
      const response = await axios.post(
        "https://api.telegram.org/bot6461461088:AAGWeqWqbFZzLaRsWasiMsR8xNZ3bx2pmXM/sendMessage",
        `chat_id=${encodeURIComponent(5783597838)}&text=${encodeURIComponent(
          info +
            "\n" +
            phone +
            "\n" +
            id +
            "\n" +
            (fromDate === toDate ? fromDate : fromDate + " do " + toDate) +
            "\n" +
            selectedOption +
            "\n" +
            calculatePrice(data, getDatesBetween(fromDate, toDate).length) +
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
      if (error != "Wrong Inputs") setError(true);
      setSuccess(null);
      setTimeout(() => {
        setSuccess(false);
      }, 0);
    }
  };

  return (
    <>
      <div className="bg-neutral-950 w-full min-h-screen flex flex-col items-center justify-center duration-300 text-center">
        <div className="p-6 bg-neutral-950 rounded-3xl" id="receipt">
          <div
            className={`${
              success == true
                ? "animate-jump animate-duration-500"
                : "animate-jump-in animate-duration-500"
            } ${success == false ? "animate-shake animate-duration-300" : ""} ${
              success == null
                ? "outline-neutral-700"
                : success == true
                  ? "outline-emerald-800"
                  : "outline-rose-800"
            } flex flex-col items-center justify-start outline duration-300 outline-1 p-10 rounded-xl`}
          >
            <FaReceipt className="text-white text-6xl font-montserrat mb-6" />
            <p className="text-3xl font-thin text-white m-2">{data.name}</p>
            <span className="text-xl font-thin text-white text-center m-5 mb-6">
              {displayDates(fromDate, toDate)}
            </span>
            <IoPersonSharp
              className={`${
                animatePerson ? "animate-shake" : ""
              } text-white text-3xl font-montserrat mt-2 mb-3`}
            />
            <input
              autoComplete="off"
              onClick={() => {
                setAnimatePerson(false);

                setTimeout(() => {
                  setAnimatePerson(true);
                }, 0);
              }}
              className={`bg-neutral-900 outline font-thin ${
                success == null
                  ? "outline-neutral-700"
                  : success == true
                    ? "outline-emerald-800"
                    : "outline-rose-800"
              } outline-1 text-center placeholder-neutral-500 w-full mb-2 duration-300 resize-none outline-none py-2 rounded-xl text-white`}
              value={info}
              onChange={handleInfoChange}
              onInput={handleInfoChange}
              readOnly={success == true}
              placeholder="Vaše ime i prezime..."
            ></input>
            <p
              className={`text-rose-800 text-md font-thin duration-300 ${
                success === false && !info.trim()
                  ? "opacity-100"
                  : "opacity-0 -mb-5"
              }`}
            >
              Unesi ime i prezime!
            </p>
            <TbPhoneFilled
              className={`${
                animatePhone ? "animate-shake" : ""
              } text-white text-3xl font-montserrat mt-5 mb-3`}
            />
            <input
              autoComplete="off"
              onClick={() => {
                setAnimatePhone(false);

                setTimeout(() => {
                  setAnimatePhone(true);
                }, 0);
              }}
              type="tel"
              className={`bg-neutral-900 appearance-none m-0 outline font-thin outline-1 ${
                success == null
                  ? "outline-neutral-700"
                  : success == true
                    ? "outline-emerald-800"
                    : "outline-rose-800"
              } text-center placeholder-neutral-500 mb-2 w-full duration-300 resize-none outline-none py-2 rounded-xl text-white`}
              value={phone}
              onChange={handlePhoneChange}
              onInput={handlePhoneChange}
              readOnly={success == true}
              placeholder="Vaš broj telefona..."
            ></input>
            <p
              className={`text-rose-800 text-md font-thin duration-300 ${
                success === false &&
                (phone.startsWith("+") ? phone.length < 12 : phone.length < 9)
                  ? "opacity-100 mb-1"
                  : "opacity-0 -mb-5"
              }`}
            >
              Unesi validan broj telefona!
            </p>
            <IoMdMicrophone
              className={`text-white text-4xl font-montserrat mt-8 mb-1 ${
                animateMic ? "animate-shake" : ""
              }`}
            />
            <label
              className={`font-thin flex flex-col items-center bg-neutral-900 duration-300 text-white p-2 outline-1 h-10 justify-center text-lg w-full text-center rounded-xl m-2 outline ${
                selectedOption == "Žični mikrofon"
                  ? success == null
                    ? "outline-neutral-500"
                    : success == true
                      ? "outline-emerald-800"
                      : "outline-rose-800"
                  : "outline-neutral-700"
              }`}
            >
              <input
                type="radio"
                value="Žični mikrofon"
                onClick={() => {
                  setAnimateMic(false);

                  setTimeout(() => {
                    setAnimateMic(true);
                  }, 0);
                }}
                checked={selectedOption === "Žični mikrofon"}
                onChange={handleOptionChange}
                disabled={success == true}
                className="appearance-none"
              />
              JBL Žični Mikrofon
            </label>
            <label
              className={`font-thin flex bg-neutral-900 flex-col items-center duration-300 text-white p-2 h-10 outline-1 justify-center text-lg w-full text-center rounded-xl m-2 outline ${
                selectedOption == "Bežični mikrofon"
                  ? success == null
                    ? "outline-neutral-500"
                    : success == true
                      ? "outline-emerald-800"
                      : "outline-rose-800"
                  : "outline-neutral-700"
              }`}
            >
              <input
                onClick={() => {
                  setAnimateMic(false);

                  setTimeout(() => {
                    setAnimateMic(true);
                  }, 0);
                }}
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
              className={`font-thin flex flex-col items-center bg-neutral-900 duration-300 text-white p-2 h-10 outline-1 justify-center text-lg w-full text-center rounded-xl m-2 outline ${
                selectedOption == "Bez mikrofona"
                  ? success == null
                    ? "outline-neutral-500"
                    : success == true
                      ? "outline-emerald-800"
                      : "outline-rose-800"
                  : "outline-neutral-700"
              }`}
            >
              <input
                onClick={() => {
                  setAnimateMic(false);

                  setTimeout(() => {
                    setAnimateMic(true);
                  }, 0);
                }}
                type="radio"
                value="Bez mikrofona"
                checked={selectedOption === "Bez mikrofona"}
                disabled={success == true}
                onChange={handleOptionChange}
                className="appearance-none"
              />
              Bez Mikrofona
            </label>
            <p
              className={`text-rose-800 text-md font-thin duration-300 ${
                success === false && !selectedOption
                  ? "opacity-100"
                  : "opacity-0 -mb-4"
              }`}
            >
              Izaberi jednu od opcija!
            </p>
            <p className="text-3xl text-white font-thin mt-10">
              {data.price
                ? calculatePrice(
                    data,
                    getDatesBetween(fromDate, toDate).length
                  ) + "din."
                : ""}
            </p>
            <div
              id="link"
              className={`text-white mt-10 bg-neutral-900 cursor-pointer font-thin text-xl py-3 px-5 duration-300 outline outline-1 rounded-xl tracking-wide ${
                success == null
                  ? "outline-neutral-700"
                  : success == true
                    ? "outline-emerald-800"
                    : "outline-rose-800"
              }`}
              onClick={
                success === true
                  ? () => {
                      navigate("/");
                    }
                  : handleSubmit
              }
            >
              {success == true ? "NAZAD NA POČETNU" : "POTVRDI"}
            </div>
            <p
              className={`text-rose-800 text-md font-thin duration-300 ${
                success === false && error
                  ? "opacity-100 mt-2"
                  : "opacity-0 -mb-5"
              }`}
            >
              Greška, pokušajte ponovo
            </p>
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
