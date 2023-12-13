import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [info, setInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState("");

  const handleInfoChange = (e) => {
    setInfo(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api.telegram.org/bot6461461088:AAGWeqWqbFZzLaRsWasiMsR8xNZ3bx2pmXM/sendMessage",
        `chat_id=${encodeURIComponent(6569148589)}&text=${encodeURIComponent(
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
                location.pathname.split("/")[3].split("-to-")[1])
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
      <textarea
        className="bg-neutral-800 m-10 mb-4 w-1/2 resize-none outline-none pl-2 pt-2 h-10 rounded-xl text-white"
        value={info}
        onChange={handleInfoChange}
        placeholder="Enter info..."
      ></textarea>
      <textarea
        className="bg-neutral-800 m-10 mb-4 w-1/2 resize-none outline-none pl-2 pt-2 h-10 rounded-xl text-white"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="Enter phone..."
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
