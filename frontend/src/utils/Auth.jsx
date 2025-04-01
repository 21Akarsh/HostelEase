import { useState } from "react";

export const useAuth = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("jwtToken"));

  const headers = {
    "Content-Type": "application/json",
    "Authorization": authToken
  };

  return { authToken, headers };
};

