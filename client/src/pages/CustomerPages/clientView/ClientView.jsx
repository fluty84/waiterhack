import { useEffect, useState } from "react";
import restaurantService from "../../../services/restaurant.services";
import { useParams } from "react-router-dom";
import Basket from "../../../components/basket/Basket";
import CreateOrder from "../../../components/CreateOrder/CreateOrder";
import { Row, Col, Container } from "react-bootstrap";
import "./ClientView.css"
import NavbarClient from "../../../components/navbarClient/NavbarClient";

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
  
  }

  const toggleTicket = () =>{

    setIsTicketModified(false)
  }

  return (
    <>
     
      <h1 id="titleCustomer">Haz tu pedido</h1>
<Container>
      <Row container spacing={2}>
        <Col md="6" xs="12">
          <CreateOrder 
          orderSent={orderSent}
            receiveOrder={receiveOrder}
       
          ></CreateOrder>
        </Col>
        <Col item md="6">
          <Basket
            id={id}
            isOrderSent={isOrderSent}
            orderSent={orderSent}
            orderForm={orderForm}
            clearOrder={clearOrder}
            isTicketModified={isTicketModified}
            toggleTicket={toggleTicket}
          ></Basket>
        </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClientView;