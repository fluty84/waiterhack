import RestaurantPanel from "../../components/restaurantPanel/RestaurantPanel";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import LoginPage from "../../components/login/LoginPage";

import './IndexPage.css'

const IndexPage = () => {

  const value = useContext(AuthContext);

  return (
    <>
      {value.user ? (
        <>
          <RestaurantPanel></RestaurantPanel>
        </>
      ) :
        <LoginPage></LoginPage>
      }
    </>
  );
};

export default IndexPage;
