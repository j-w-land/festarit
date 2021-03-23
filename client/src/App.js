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

    let tokensValue = { messsage: null, token: null, status: false };
    if (existingTokens == null || existingTokens == undefined) {
    } else {
      fetchApi("/user/authenticate", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: existingTokens.token }),
      })
        .then((data) => {
          const hasError = "error" in data && data.error != null;

          if (!data.error) {
            //setAuthTokens(data);
            if (data.status === true) {
              setLoggedIn(true);
              tokensValue = existingTokens;
            }
          } else {
            setTokens(tokensValue);
            setLoggedIn(false);
          }

          setAuthTokens(tokensValue);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
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
