import React, { useState, useEffect } from "react";

import { useAuth } from "../context/auth";

import fetchApi from "../api/fetchApi";

const Store = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [tickets, setTickets] = useState({
    key: { selected: false, price: 0 },
  });

  const [extras, setExtras] = useState({ key: { selected: false, price: 0 } });

  const { authTokens } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);

  let price = 0;

  const handleTicketClick = (e) => {
    let id_arr = e.target.id.split(":");
    let type = id_arr[0];
    let key = id_arr[1];
    let value = id_arr[2];
    let res_object = {};
    if (type === "ticket") {
      res_object = { ...tickets };
      Object.keys(res_object).map((e) => {
        res_object[e].selected = false;
        if (e === key) {
          try {
            res_object[e].selected = true;
            price = price + res_object[e].price;
          } catch (error) {}
        }
      });
      setTickets(res_object);
    } else if (type === "extra") {
      res_object = { ...extras };
      Object.keys(res_object).map((e) => {
        if (e === key) {
          try {
            res_object[e].selected = !res_object[e].selected;
            if (res_object[e].selected) {
              price = price + res_object[e].price;
            }
          } catch (error) {}
        }
      });
      setExtras(res_object);
    }
  };

  useEffect(() => {
    let price = 0;

    Object.keys(extras).map((key) => {
      if (extras[key].selected) {
        price = price + parseInt(extras[key].price);
      }
    });
    Object.keys(tickets).map((key) => {
      if (tickets[key].selected) {
        price = price + parseInt(tickets[key].price);
      }
    });

    setTotalPrice(price);
  }, [extras, tickets]);

  useEffect(() => {
    const fetchData = async () => {
      fetchApi("/store/prices", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: authTokens.token }),
      })
        .then((data) => {
          const hasError = "error" in data && data.error != null;

          if (!data.error) {
            try {
              let res = JSON.parse(data.data);
              let ticketData = res.tickets.trim();
              let extrasData = res.extras.trim();

              let ticketDataArray = ticketData.split("\n");
              let ticketObj = {};
              let ticketObjSelect = {};

              for (const item in ticketDataArray) {
                let splitArray = ticketDataArray[item].split(";");

                ticketObj[splitArray[0]] = {
                  price: splitArray[1],
                  selected: false,
                };
                ticketObjSelect[splitArray[0]] = false;
              }
              //ticketDataArray.pop();

              setTickets(ticketObj);

              let extrasDataArray = extrasData.split("\n");
              let extrasObj = {};
              let extrasObjSelect = {};

              for (const item in extrasDataArray) {
                let splitArray = extrasDataArray[item].split(";");

                extrasObj[splitArray[0]] = {
                  price: splitArray[1],
                  selected: false,
                };
                extrasObjSelect[splitArray[0]] = false;
              }

              setExtras(extrasObj);
            } catch (error) {}
          } else {
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex-container store">
        <div className="flex-home-left">
          <div>
            <h2>Hinta </h2>

            <p>{totalPrice} eur</p>

            <p>
              <a>
                Lippujen tilaus aukeaa pian. Seuraa sosiaalisen median
                sivustojamme ja rock on!
              </a>
            </p>
          </div>
        </div>

        <div className="flex-home-right">
          <h2>Liput </h2>

          <ul className="ticket-ul" onClick={handleTicketClick}>
            <li className="flex-container store ">
              {Object.keys(tickets).map((day) => {
                let selected_string = " ";
                try {
                  if (tickets[day].selected === true) {
                    selected_string = "selected";
                  } else {
                    selected_string = "";
                  }
                } catch (error) {
                  return;
                }

                return (
                  <div
                    className={`flex-container store tickets ${selected_string} `}
                    id={`ticket:${day + ":" + tickets[day].price}`}
                    key={day}
                    style={{ width: "29%" }}
                  >
                    <a className="no-pointer-events">
                      <p className="no-pointer-events">{day}</p>
                      <p className="no-pointer-events">
                        {tickets[day].price} eur
                      </p>
                    </a>
                  </div>
                );
              })}
            </li>
            {Object.keys(extras).map((key) => {
              let selected_string = " ";

              try {
                if (extras[key].selected === true) {
                  selected_string = "selected";
                } else {
                  selected_string = "";
                }
              } catch (error) {
                return;
              }

              return (
                <li
                  id={`extra:${key + ":" + extras[key].price}`}
                  key={key}
                  className={`flex-container store tickets ${selected_string} `}
                >
                  <div className="no-pointer-events">
                    <a className="no-pointer-events">
                      <p className="no-pointer-events">{key}</p>
                      <p className="no-pointer-events">
                        {extras[key].price} eur
                      </p>
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Store;
