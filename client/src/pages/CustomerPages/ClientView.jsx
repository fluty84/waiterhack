import { useEffect, useState } from "react";
import restaurantService from "../../services/restaurant.services";
import { useParams } from "react-router-dom";
import Basket from "./Basket";
import CreateOrder from "../../components/CreateOrder/CreateOrder";

const ClientView = () => {
  const [restaurant, setRestarant] = useState();

  const { id, tableId } = useParams();

  useEffect(() => {
    loadRestarurant();
  }, []);

  const loadRestarurant = () => {
    restaurantService.getRestaurant("6220f66aeca2aa71f20c76d2"); //SUSTITUIR POR ID
  };

  return (
    <>
      <h1>Haz tu pedido</h1>
      <Basket id={id}></Basket>
      <CreateOrder></CreateOrder>
    </>
  );
};

export default ClientView;
