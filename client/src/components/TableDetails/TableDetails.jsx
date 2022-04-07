import { Row, Col } from "react-bootstrap";
import Basket from "../basket/Basket";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom'
import restaurantService from "../../services/restaurant.services";
import { io } from "socket.io-client";

const socket = io()


import("./TableDetails.css");

const TableDetails = ({ order, handleClose, number, tableIdModal }) => {
  const value = useContext(AuthContext);
  const { _id } = value.user;
  const newArr = [];
  const tableId = [];


  order.currentOrder.forEach((x) => {
    Object.entries(x).forEach((item) => {
      if (item[0] != "id") {
        newArr.push(item);
      } else {
        !tableId.length && tableId.push(item[1]);
      }
    })

  })

  const accept = () => {
    //socket.emit("join_room", "ACEPTADO");

    restaurantService
      .acceptOrder({ id: tableId[0] })
      .then(({ data }) => {
        console.log(data);
      })
      .then(() => handleClose())
      .catch((err) => console.log(err));

  };

  const cancel = () => {
    //socket.emit("join_room", "cancelado");

    restaurantService
      .cancelOrder({ id: tableId[0] })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const tableDelete = () => {
    let ok = window.confirm('¿Seguro que quieres borrar la mesa?')
    if (ok){
      console.log(tableIdModal)
      restaurantService 
        .deleteTable(tableIdModal)
        .then(() => handleClose())
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="order">
      <h1>Mesa {number} </h1> <Button className="buttonDelete" onClick={() => tableDelete()}>Borrar Mesa</Button>
      <Row>
        <Col md={6}>
          {newArr.map((item) => {
            return (
              <p>
                {item[0]} cantidad : {item[1]}
              </p>
            );
          })}
        </Col>

        <Col md={6}>
          <Basket
            _id={_id}
            tableId={tableId[0]}
            handleClose={handleClose}
          ></Basket>

          {order.currentOrder.length ? (
            <>
              <Button className="btn-primary" onClick={accept}>Aceptar pedido</Button>
              <Button className="btn-primary" onClick={cancel}>Cancelar Pedido</Button>{" "}
            </>
          ) : null}

          <Link to={`/restaurante/${_id}/panel/${order._id}/qr/${number}`} className='link'>
            <Button
              className="btn-primary"
              target="_blank"
            >
              Imprimir QR
            </Button>
          </Link>

          <Link to={`/restaurante/${_id}/${tableIdModal}/check-out`} className='link'><Button className="btn-primary" >Go to Checkout</Button></Link>

        </Col>
      </Row>
    </div>
  );
};
export default TableDetails;

