import LoginForm from "../../components/login/login";
import RestaurantPanel from "../../components/restaurantPanel/RestaurantPanel";
import { AuthContext } from "../../context/auth.context";
import { useState, useContext, useEffect } from "react";

const IndexPage = () => {
  const value = useContext(AuthContext);

  return (
    <>
      {value.user ? (
        <>
          <RestaurantPanel></RestaurantPanel>{" "}
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default IndexPage;
