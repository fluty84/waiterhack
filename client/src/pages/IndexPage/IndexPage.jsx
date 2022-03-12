import RestaurantPanel from "../../components/restaurantPanel/RestaurantPanel";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import './IndexPage.css'

const IndexPage = () => {

  const value = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <>
      {value.user ? (
        <>
          <RestaurantPanel></RestaurantPanel>
        </>
      ) :
        navigate('/restaurante/log-in')
      }
    </>
  );
};

export default IndexPage;
