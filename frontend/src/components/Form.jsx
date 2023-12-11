import React from "react";

const Form = () => {
  return (
    <div className="bg-neutral-950 w-full min-h-screen flex flex-col items-center">
      <h1 className="text-white font-bold text-6xl font-montserrat mt-20 mb-6">
        REZERVIŠI
      </h1>
      <textarea className="bg-neutral-800 m-10 mb-4 w-1/2 resize-none outline-none rounded-xl"></textarea>
      <textarea className="bg-neutral-800 m-10 mb-4 w-1/2 resize-none outline-none rounded-xl"></textarea>
    </div>
  );
};

export default Form;
