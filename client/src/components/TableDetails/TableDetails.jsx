import { Row, Col } from "react-bootstrap";
import Basket from "../basket/Basket";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
import { Button, ButtonGroup, Link } from "@mui/material";
import restaurantService from "../../services/restaurant.services";
import { io } from "socket.io-client";
import Qr from "../qr/Qr";
import QrPrint from "../../pages/qrPrint/QrPrint";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

import("./TableDetails.css");

const TableDetails = ({ order, handleClose, number }) => {
  const value = useContext(AuthContext);
  const { _id } = value.user;

  const spreadArr = { ...order.currentOrder };
  const newArr = [];
  const tableId = [];

  order.currentOrder.filter((elm) => {
    console.log(elm, "elementos");
  });

  order.currentOrder.forEach((x) => {
    Object.entries(x).forEach((item) => {
      if (item[0] != "id") {
        newArr.push(item);
      } else {
        !tableId.length && tableId.push(item[1]);
      }
    });
    console.log({ tableId: tableId[0] }, "tableID");
  });

  const accept = () => {
    socket.emit("join_room", "ACEPTADO");

    restaurantService
      .acceptOrder({ id: tableId[0] })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const cancel = () => {
    socket.emit("join_room", "cancelado");

    console.log("cancelado");
    restaurantService
      .cancelOrder({ id: tableId[0] })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="order">
      <h1>Table {number} Details</h1>
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
              <Button onClick={accept}>Aceptar pedido</Button>
              <Button onClick={cancel}>Cancelar Pedido</Button>{" "}
            </>
          ) : null}

          <Button
            href={`/restaurante/${_id}/panel/${order._id}/qr/${number}`}
            target="_blank"
          >
            Imprimir QR
          </Button>
          
          <Button>
          <Link to={`/restaurante/${_id}/${tableId}/check-out`}>Go to Checkout</Link>
        </Button>
       
        </Col>
      </Row>
    </div>
  );
};
export default TableDetails;
