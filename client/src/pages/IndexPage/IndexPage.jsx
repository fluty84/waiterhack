import LoginPage from "../../components/login/LoginPage";
import RestaurantPanel from "../../components/restaurantPanel/RestaurantPanel";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import CreateOrder from "../../components/CreateOrder/CreateOrder";

const IndexPage = () => {
  const value = useContext(AuthContext);

  return (
    <>
      {value.user ? (
        <>
          <RestaurantPanel></RestaurantPanel>
          <CreateOrder></CreateOrder>
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default IndexPage;
