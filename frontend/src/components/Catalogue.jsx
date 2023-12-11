import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const Catalogue = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = React.useState();

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:5000/data";
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-950 flex flex-col items-center justify-start">
      <DayPicker
        mode="single"
        onSelect={setSelected}
        className="text-neutral-200 bg-neutral-800 p-10 rounded-3xl font-montserrat"
        styles={{
          caption: {
            backgroundColor: "RGB(29,29,29)",
            padding: "0.5rem",
            borderRadius: "1rem",
            marginBottom: "1rem",
          },
        }}
      />
    </div>
  );
};

export default Catalogue;
