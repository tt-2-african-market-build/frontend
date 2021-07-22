import React from "react";

export default function Nutrition() {
  return (
    <React.Fragment>
      <div
        className={
          "nutrition-container bg-black text-center w-screen flex flex-col justify-center align-center"
        }
      >
        {" "}
        <h2
          className={"text-white mx-auto mt-32 text-5xl"}
          style={{ textShadow: "0 0 1rem Black" }}
        >
          Nutrition Corner
        </h2>
      </div>
      <div
        className={
          "bg-white h-96 w-screen flex flex-col justify-center text-center align-center"
        }
      ></div>
    </React.Fragment>
  );
}
