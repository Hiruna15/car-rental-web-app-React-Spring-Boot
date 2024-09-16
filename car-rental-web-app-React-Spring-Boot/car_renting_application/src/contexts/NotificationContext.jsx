import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

function useNotification() {
  return useContext(NotificationContext);
}

function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  useEffect(
    function () {
      async function fetchData() {
        try {
          let res = await axios.get(
            `http://localhost:8082/RentARide/vehicles/carscount/statuses/${user.id}`,
            {
              params: {
                statuses: "available,currentlyrented",
              },
            }
          );

          if (res.data > 0) {
            res = axios.get("http://localhost:8084/RentARide/");
          }
        } catch (error) {
          throw new Error(error);
        }
      }

      fetchData;
    },
    [user]
  );

  return (
    <NotificationContext.Provider value={{ message }}>
      {children}
    </NotificationContext.Provider>
  );
}

export { useNotification, NotificationProvider };
