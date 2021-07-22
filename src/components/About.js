import React from "react";

export default function About() {
  return (
    <React.Fragment>
      <div
        className={
          "about-container bg-black w-screen text-center flex flex-col justify-center align-center"
        }
      >
        {" "}
        <h1 className={"text-white mt-20 mx-auto text-5xl"} style={{textShadow: '0 0 1rem black'}}>
          Meet the Grubspace team
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
