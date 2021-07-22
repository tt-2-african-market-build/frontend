import React from "react";

export default function Cocktail() {
  return (
    <React.Fragment>
      <div
        className={
          "cocktail-container bg-black text-center w-screen flex flex-col justify-center align-center"
        }
      >
        {" "}
        <h1 className={"text-white mx-auto text-5xl"} style={{textShadow: '0 0 1.5rem black'}}>
          Cocktail Culture
        </h1>
      </div>
      <div
        className={
          "bg-white h-96 w-screen flex flex-col justify-center text-center align-center"
        }
      ></div>
    </React.Fragment>
  );
}
