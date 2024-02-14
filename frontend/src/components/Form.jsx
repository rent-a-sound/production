import React, { useState, useEffect } from "react";
import axios from "axios";
import { eachDayOfInterval, format, parse, addDays } from "date-fns";
import { srLatn } from "date-fns/locale";
import { FaReceipt } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { TbPhoneFilled } from "react-icons/tb";
import { IoMdMicrophone } from "react-icons/io";
import { useLocation, useNavigate, Link } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import { BiSolidRightArrow } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const Form = () => {
  const [info, setInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(null);
  const [data, setData] = useState({});
  const [animatePerson, setAnimatePerson] = useState(false);
  const [animatePhone, setAnimatePhone] = useState(false);
  const [animateMic, setAnimateMic] = useState(false);
  const [error, setError] = useState(false);
  const [selectedOptionTemp, setSelectedOptionTemp] = useState("");
  const navigate = useNavigate();

  const micMap = {
    nomic: [0],
    mic: [500, 800, 1000, 1200, 1300],
    wmic: [700, 1000, 1300, 1500, 1700],
    mic2: [800, 1200, 1500, 1800, 2000, 2200],
    wmic2: [1200, 1800, 2100, 2400, 2600, 2800],
  };

  const micOverdraft = {
    nomic: 0,
    mic: 100,
    wmic: 100,
    mic2: 100,
    wmic2: 100,
  };

  const [selectedOption, setSelectedOption] = useState("");

  //Get speaker id, from and to dates from query params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const fromDate = queryParams.get("from");
  const toDate = queryParams.get("to");

  const handleOptionChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOptionTemp(newSelectedOption);
    setTimeout(() => {
      setSelectedOption(newSelectedOption);
    }, 1250);
  };

  //Allow only letters for name
  const handleInfoChange = (e) => {
    const formattedValue = e.target.value.replace(
      /[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s]/g,
      ""
    );
    setInfo(formattedValue);
  };

  //Allow only numbers & plus sign, limit number of digits
  const handlePhoneChange = (e) => {
    const formattedValue = e.target.value.replace(/[^\d+]/g, "");
    setPhone(formattedValue.slice(0, 14));
  };

  //Manupulates DOM to take the link out and change the text, then downloads image of div and returns it original text/link
  const generateImage = () => {
    const linkElement = document.getElementById("link");

    const originalButtonText = linkElement.textContent;

    linkElement.textContent = "POTVRDJENO";

    const receiptDiv = document.getElementById("receipt");
    const paragraphElement = receiptDiv.querySelector("p.underline");

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

  //Fetch data for a single speaker
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.zvucnici.com/single?id=" + id
        );
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
      }
    };

    fetchData();
  }, []);

  //Helper function, creates a list of all dates between date1 and date2 in dd-MM-yyyy format
  function getDatesBetween(date1, date2, dateFormat = "dd-MM-yyyy") {
    const parsedDate1 = date1
      ? parse(date1, dateFormat, new Date())
      : new Date(0);
    const parsedDate2 = date2
      ? parse(date2, dateFormat, new Date())
      : new Date(0);

    const datesBetween = eachDayOfInterval({
      start: parsedDate1,
      end: parsedDate2,
    });

    const formattedDates = datesBetween.map((date) => format(date, dateFormat));

    return formattedDates;
  }

  //Formats dates in readable format
  function displayDates(date1, date2) {
    const displayDate1 = date1
      ? parse(date1, "dd-MM-yyyy", new Date())
      : new Date(0);
    const displayDate2 = date2
      ? parse(date2, "dd-MM-yyyy", new Date())
      : new Date(0);

    return (
      <div className="py-6">
        <span className="flex sm:flex-row flex-col items-center justify-center pb-8">
          <p className="text-xl">Preuzimanje</p>
          <BiSolidRightArrow className="text-xs my-2 sm:mx-2 rotate-90 sm:rotate-0" />
          {format(displayDate1, "PPP", { locale: srLatn })}
        </span>
        <span className="flex sm:flex-row flex-col items-center justify-center">
          <p className="text-xl">Povrat</p>
          <BiSolidRightArrow className="text-xs my-2 sm:mx-2 rotate-90 sm:rotate-0" />
          {format(addDays(displayDate2, 1), "PPP", { locale: srLatn })}
        </span>
      </div>
    );
  }

  //Calculate price based on speaker, how many days rented and what microphone option is selected
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
          (selectedOption
            ? micMap[selectedOption][days - 1]
              ? micMap[selectedOption][days - 1]
              : micMap[selectedOption][micMap[selectedOption].length - 1] +
                micOverdraft[selectedOption] *
                  (days - micMap[selectedOption].length)
            : 0)
        : priceObject.price +
          (selectedOption
            ? micMap[selectedOption][days - 1]
              ? micMap[selectedOption][days - 1]
              : micMap[selectedOption][micMap[selectedOption].length - 1] +
                micOverdraft[selectedOption] *
                  (days - micMap[selectedOption].length)
            : 0);
  };

  //Helper function, checks if name has anything, number is valid length and is any mic option selected
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

  //Checks for inputs, then uses telegram bot API to send an order to admin
  const handleSubmit = async () => {
    try {
      if (!checkAllInputs()) {
        throw new Error("Wrong Inputs");
      }
      const response = await axios.post(
        "https://api.telegram.org/bot6461461088:AAGWeqWqbFZzLaRsWasiMsR8xNZ3bx2pmXM/sendMessage",
        `chat_id=${encodeURIComponent(6569148589)}&text=${encodeURIComponent(
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
            "din." +
            "\n\n" +
            "/rez " +
            id +
            " " +
            fromDate +
            " " +
            (fromDate == toDate ? "" : toDate)
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
      <div className="bg-neutral-950 w-full h-full flex flex-col items-center justify-start duration-300 text-center">
        <div className="p-8 bg-neutral-950 rounded-3xl" id="receipt">
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
            } flex flex-col items-center justify-start outline duration-300 outline-1 p-12 rounded-xl`}
          >
            <FaReceipt className="text-white text-6xl font-montserrat mt-6 mb-10" />
            <p className="text-3xl font-thin text-white m-2 animate-jump-in">
              {data.name}
            </p>
            <span className="text-xl font-thin text-white text-center m-5 mb-6">
              {displayDates(fromDate, toDate)}
            </span>
            <IoPersonSharp
              className={`${
                animatePerson ? "animate-shake" : ""
              } text-white text-3xl font-montserrat mt-8 mb-3`}
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
                    : success == false && !info.trim()
                      ? "outline-rose-800"
                      : "outline-neutral-700"
              } outline-1 text-center placeholder-neutral-500 w-full mb-3 duration-300 resize-none outline-none py-2 rounded-xl text-white`}
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
                    : success === false &&
                        (phone.startsWith("+")
                          ? phone.length < 12
                          : phone.length < 9)
                      ? "outline-rose-800"
                      : "outline-neutral-700"
              } text-center placeholder-neutral-500 mb-3 w-full duration-300 resize-none outline-none py-2 rounded-xl text-white`}
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
              className={`text-white text-4xl font-montserrat mt-5 mb-1 ${
                animateMic ? "animate-shake" : ""
              }`}
            />
            <select
              className={`appearance-none bg-neutral-900 w-full py-2 rounded-xl safari-text-center text-center mt-2 outline outline-1 outline-offset-2 font-thin ${
                success == null
                  ? !selectedOption
                    ? "outline-neutral-700 text-neutral-500"
                    : "outline-neutral-700 text-white"
                  : success == true
                    ? "outline-emerald-800 text-white"
                    : !selectedOption
                      ? "outline-rose-800 text-neutral-500"
                      : "outline-neutral-700 text-white"
              }
              }`}
              value={selectedOption}
              onChange={handleOptionChange}
              onClick={() => {
                setAnimateMic(false);

                setTimeout(() => {
                  setAnimateMic(true);
                }, 0);
              }}
            >
              <option disabled hidden value="">
                Izaberi mikrofon
              </option>

              <option
                disabled={success == true && selectedOption != "nomic"}
                value="nomic"
              >
                Bez mikrofona
              </option>

              <option
                disabled={success == true && selectedOption != "mic"}
                value="mic"
              >
                Žični mikrofon
              </option>

              <option
                disabled={success == true && selectedOption != "wmic"}
                value="wmic"
              >
                Bežični mikrofon
              </option>

              <option
                disabled={success == true && selectedOption != "mic2"}
                value="mic2"
              >
                Žični mikrofon x 2
              </option>

              <option
                disabled={success == true && selectedOption != "wmic2"}
                value="wmic2"
              >
                Bežični mikrofon x 2
              </option>
            </select>
            <p
              className={`text-rose-800 text-md font-thin duration-300 ${
                success === false && !selectedOption
                  ? "opacity-100 mt-3"
                  : "opacity-0 -mb-4"
              }`}
            >
              Izaberi jednu od opcija!
            </p>
            <p
              key={selectedOptionTemp + "option"}
              className="text-white font-thin text-lg mt-2 animate-money"
            >
              {selectedOptionTemp
                ? micMap[selectedOptionTemp][
                    getDatesBetween(fromDate, toDate).length - 1
                  ]
                  ? micMap[selectedOptionTemp][
                      getDatesBetween(fromDate, toDate).length - 1
                    ] + " RSD"
                  : micMap[selectedOptionTemp][
                      micMap[selectedOptionTemp].length - 1
                    ] +
                    micOverdraft[selectedOptionTemp] *
                      (getDatesBetween(fromDate, toDate).length -
                        micMap[selectedOptionTemp].length) +
                    " RSD"
                : "ㅤ"}
            </p>
            <p
              key={selectedOption}
              className="text-3xl text-white font-thin mt-11 animate-jump"
            >
              {data.price
                ? calculatePrice(
                    data,
                    getDatesBetween(fromDate, toDate).length
                  ) + " RSD"
                : ""}
            </p>
            <div
              id="link"
              className={`text-white mt-14 bg-neutral-900 cursor-pointer font-thin text-lg py-3 px-5 duration-300 outline outline-1 rounded-xl tracking-wide ${
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
                  ? "opacity-100 mt-3"
                  : "opacity-0 -mb-6"
              }`}
            >
              Greška, pokušajte ponovo
            </p>
            {success == true ? (
              <p
                onClick={generateImage}
                className="text-white text-lg font-thin mt-10 mb-3 underline underline-offset-2 duration-300"
              >
                Sačuvaj Račun
              </p>
            ) : (
              <Link
                to={`/katalog/${data.city}`}
                className={`${
                  success ? "hidden" : ""
                } mt-10 mb-1 flex flex-row items-center justify-center font-thin text-md text-neutral-400`}
              >
                <RxCross2 className={`text-neutral-500 text-xl mr-1`} />
                NAZAD
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
