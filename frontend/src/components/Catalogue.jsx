import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Catalogue = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the Flask app URL where the data is served
    const apiUrl = "http://127.0.0.1:5000/data";

    // Fetch data from the Flask app using Axios
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
    <div>
      <h1>Data Display</h1>
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
          <p>Age: {data.age}</p>
          <p>City: {data.city}</p>
        </div>
      )}
    </div>
  );
};

export default Catalogue;
