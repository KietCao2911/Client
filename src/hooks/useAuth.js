import React from "react";
import { getAuth } from "firebase/auth";
const useAuth = () => {
  const auth = getAuth();
  auth.languageCode = "it";
  return <div>useAuth</div>;
};

export default useAuth;
