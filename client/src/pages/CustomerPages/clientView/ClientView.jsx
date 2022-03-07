import { useEffect, useState } from "react";
import restaurantService from "../../../services/restaurant.services";
import { useParams } from "react-router-dom";
import Basket from "../../../components/basket/Basket";
import CreateOrder from "../../../components/CreateOrder/CreateOrder";
import { Grid, Item } from "@mui/material";

const ClientView = () => {
  const [restaurant, setRestarant] = useState();

  const [isOrderSent, setIsOrderSent] = useState(false);

  const [orderForm, setOrderForm] = useState([]);

  const [isTicketModified, setIsTicketModified] = useState(false)

  const receiveOrder = (order) => {
    setOrderForm(order);
  };

  const orderSent = () => {
    if (isOrderSent === false) {
      setIsOrderSent(true);
    } else {
      setIsOrderSent(false);
    }
  };

  const { id, tableId } = useParams();

  useEffect(() => {
    loadRestarurant();
  }, []);

  const loadRestarurant = () => {
    restaurantService.getRestaurant("6220f66aeca2aa71f20c76d2"); //SUSTITUIR POR ID
  };

  const clearOrder = () => {
    setOrderForm({})
    //setTicket({})
    setIsTicketModified(true)
    console.log('ahora order es ', orderForm)
  }

  const toggleTicket = () =>{

    setIsTicketModified(false)
  }

  return (
    <>
      <h1>Haz tu pedido</h1>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CreateOrder 
          orderSent={orderSent}
            receiveOrder={receiveOrder}
       
          ></CreateOrder>
        </Grid>
        <Grid item xs={4}>
          <Basket
            id={id}
            isOrderSent={isOrderSent}
            orderSent={orderSent}
            orderForm={orderForm}
            clearOrder={clearOrder}
            isTicketModified={isTicketModified}
            toggleTicket={toggleTicket}
          ></Basket>
        </Grid>
      </Grid>
    </>
  );
};

export default ClientView;