import LoginPage from "../../components/login/LoginPage";
import RestaurantPanel from "../../components/restaurantPanel/RestaurantPanel";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import CreateOrder from "../../components/CreateOrder/CreateOrder";
import { useNavigate } from "react-router-dom";


const IndexPage = () => {
  
  const value = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <>
      {value.user ? (
        <>
          <RestaurantPanel></RestaurantPanel>
          <CreateOrder></CreateOrder>
        </>
      ) : 
        navigate('/restaurante/log-in') 
      }
    </>
  );
};

export default IndexPage;
