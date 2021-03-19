import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import { AuthContext } from "./context/auth";
import Routes from "./Routes";
import fetchApi from "./api/fetchApi";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [authTokens, setAuthTokens] = useState({});

  useEffect(() => {
    let existingTokens = null;
    try {
      existingTokens = JSON.parse(localStorage.getItem("tokens"));
    } catch (error) {}

    console.log(existingTokens);
    console.log("existingTokens__-");

    let tokensValue = { messsage: null, token: null, status: false };
    if (existingTokens == null || existingTokens == undefined) {
    } else {
      console.log(tokensValue);
      console.log("tokensValue___");

      fetchApi("/user/authenticate", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: existingTokens.token }),
      })
        .then((data) => {
          console.log("login_res: " + data);
          console.log(data);
          const hasError = "error" in data && data.error != null;
          console.log(hasError);
          console.log("hasError");

          if (!data.error) {
            console.log("ERROR_FALSE");
            console.log(data);
            //setAuthTokens(data);
            if (data.status === true) {
              setLoggedIn(true);
              tokensValue = existingTokens;
            }
          } else {
            setTokens(tokensValue);
            setLoggedIn(false);
          }
          console.log(existingTokens);
          console.log(tokensValue);
          console.log("tokensValue_______________!");
          setAuthTokens(tokensValue);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    console.log(authTokens.token);
    console.log("TOKENS___");
    if (
      authTokens === undefined ||
      authTokens.token === undefined ||
      authTokens.token === null
    ) {
      setLoggedIn(false);
    } else {
      if (authTokens.status === true) setLoggedIn(true);
    }
  }, [authTokens]);

  const handleAuthentication = async () => {};

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Routes isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}></Routes>
    </AuthContext.Provider>
  );
}

export default App;
