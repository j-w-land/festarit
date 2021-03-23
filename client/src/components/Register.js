// Register.js
import React, { useState } from "react";

import { useAuth } from "../context/auth";

import fetchApi from "../api/fetchApi";

const Register = ({ setLoginRegister, handleLoginRegister, setLoggedIn }) => {
  const { setAuthTokens } = useAuth();

  const [message, setMessage] = useState();
  const [formData, updateFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const form_key_text = {
    username: "käyttäjänimi",
    password: "salasana",
    email: "sähköposti",
    phone: "puhelinnumero",
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let form_error = false;
    let form_error_keys = [];
    Object.keys(formData).map((key) => {
      if (formData[key] === "") {
        form_error_keys.push(key);
        form_error = true;
      }
    });
    if (form_error === true) {
      let string = " ";
      if (form_error_keys.length === 1) {
        string = string + form_key_text[form_error_keys[0]] + ", ";
      } else {
        for (const key in form_error_keys) {
          string = string + form_key_text[form_error_keys[key]];
          if (key == form_error_keys.length - 2) {
            string = string + " ja ";
          } else if (key !== form_error_keys.length - 1) {
            string = string + ", ";
          }
        }
      }

      setMessage({
        data: `Syötä ${string}kiitos ja rock on!`,
        type: "alert-warning",
      });
      return;
    }

    setMessage({
      data: "Rekisteröidään...",
      type: "alert-warning",
    });

    fetchApi("/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((data) => {
        const hasError = "error" in data && data.error != null;
        setMessage({
          data: hasError ? data.error : "Registered successfully",
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

  return (
    <div
      className={`${"container"} container-fluid d-flex align-items-center justify-content-center`}
    >
      <div className={"registrationFormContainer"}>
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
            className={`${"registrationFormLegend"} border rounded p-1 text-center`}
          >
            Rekisteröi tili
          </legend>
          <form>
            <div className="form-group">
              <label htmlFor="inputForName">Nimi</label>
              <span className="mandatory">*</span>
              <input
                id="inputForName"
                type="text"
                className="form-control"
                aria-describedby="Enter your user name"
                placeholder="Syötä nimi"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputForName">Sähköposti</label>
              <span className="mandatory">*</span>
              <input
                id="inputForName"
                type="text"
                className="form-control"
                aria-describedby="Sähköposti"
                placeholder="Sähköposti"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputForName">Puhelinnumero</label>
              <span className="mandatory">*</span>
              <input
                id="inputForName"
                type="text"
                className="form-control"
                aria-describedby="Puhelinnumero"
                placeholder="Puhelinnumero"
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputForPassword">Salasana</label>
              <span className="mandatory">*</span>
              <input
                type="password"
                className="form-control"
                id="inputForPassword"
                placeholder="Syötä salasana"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={handleSubmit}
              >
                Syötä
              </button>
              <button className="btn btn-link" onClick={handleLoginRegister}>
                Takaisin
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};
export default Register;
