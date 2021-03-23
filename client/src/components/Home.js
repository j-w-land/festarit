import React, { useState } from "react";

import Login from "./Login";
import Store from "./Store";

const Home = ({ isLoggedIn, setLoggedIn }) => {
  console.log(isLoggedIn);

  console.log("isLoggedIn________---");

  if (isLoggedIn) {
    return <Store></Store>;
  }

  return (


    <div>
      <div className="flex-container">
        <div className="flex-home-left">
          <div>
            <Login setLoggedIn={setLoggedIn}></Login>
          </div>
        </div>

        <div className="flex-home-right">
          <h1 style={{ paddingLeft: "80px", paddingBottom: "5px" }}>
            FESTARIKESÄ 2021
          </h1>
          <h4 style={{ paddingLeft: "80px" }}>Osta liput nyt! </h4>
          <div style={{ marginTop: "30px", paddingLeft: "80px" }}>
            <h5>Miksi tulla festareille?</h5>
            <ul>
              <li>Täällä on kivaa</li>
              <li>Kaikki rokkaa </li>
              <li>Huippuesiintyjät </li>
              <li>Keksi parempi syy jos nämä ei kelpaa</li>
            </ul>

            <img
              style={{ width: "80%" }}
              src="https://thumbs.dreamstime.com/b/series-cute-penguins-playing-musical-instruments-christmas-card-80081556.jpg"
              alt="new"
            />
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default Home;
