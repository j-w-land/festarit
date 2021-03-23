import React, { useState } from "react";

import { useAuth } from "../context/auth";
import fetchApi from "../api/fetchApi";
import Register from "./Register";

const Login = ({ setLoggedIn }) => {
  const { setAuthTokens } = useAuth();

  // 0 = login , 1 = register template
  const [loginRegister, setLoginRegister] = useState(false);

  const [message, setMessage] = useState();

  const [formData, updateFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log("handChange");
    console.log(formData);
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleLoginRegister = (e) => {
    e.preventDefault();
    setLoginRegister(!loginRegister);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage({
      data: "Logging in is in progress...",
      type: "alert-warning",
    });

    fetchApi("/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((data) => {
        console.log("login_res: " + data);
        console.log(data);
        const hasError = "error" in data && data.error != null;
        console.log(hasError);
        console.log("hasError");
        setMessage({
          data: hasError
            ? data.error
            : "Sisäänkirjautuminen onnistui, ohjataan...",
          type: hasError ? "alert-danger" : "alert-success",
        });

        if (!data.error) {
          setAuthTokens(data);
        } else {
          setAuthTokens(data);
        }
      })
      .catch((err) => console.log(err));
  };

  if (loginRegister === true) {
    return (
      <Register
        setLoginRegister={setLoginRegister}
        handleLoginRegister={handleLoginRegister}
        setLoggedIn={setLoggedIn}
      ></Register>
    );
  }

  return (
    <div
      className={`${"container"} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={"loginFormContainer"}>
        {message && (
          <div
            className={`alert fade show d-flex ${message.type}`}
            role="alert"
          >
            {message.data}

            <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>
          </div>
        )}
        <fieldset className="border p-3 rounded">
          <legend
            className={`${"loginFormLegend"} border rounded p-1 text-center`}
          >
            Sisäänkirjautuminen
          </legend>
          <form>
            <div className="form-group">
              <label htmlFor="inputForUserName">Käyttäjätunnus</label>
              <span className="mandatory">*</span>
              <input
                id="inputForUserName"
                name="email"
                type="email"
                className="form-control"
                aria-describedby="Sähköposti"
                placeholder="Syötä sähköposti"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Salasana</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Syötä salasana"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex align-items-center">
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={handleSubmit}
              >
                Kirjaudu sisään
              </button>

              <button
                className="btn btn-link ml-auto"
                onClick={handleLoginRegister}
              >
                Uusi käyttäjä?
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
