import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import restaurantService from "../../services/restaurant.services";
import { Fab } from "@mui/material";
import { Form, Button } from "react-bootstrap";
import productService from "../../services/product.services";
import { useParams } from "react-router-dom";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const CreateOrder = (props) => {
  const [products, setProducts] = useState([]);
  const [productNum, setProductNum] = useState([props.isUpdated]);
  const [orderForm, setOrderForm] = useState({});

  const [userName, setUsername] = useState("Popino");

  // const joinRoom = () => {
  //   socket.emit("join_room", orderForm);
  // };

  useEffect(() => {
    loadMenu();
  }, []);

  const { _id, tableId } = useParams();

  const loadMenu = () => {
    restaurantService
      .getRestaurant({ _id })
      .then((response) => setProducts(response.data.menu))
      .catch((err) => console.log(err));
  };

  const handleInputChange = (arg) => {
    if (arg.target.value < 0 || arg.target.value > 50) {
      arg.target.value = 0;
    }
    const { name, value } = arg.target;

    setOrderForm({
      ...orderForm,
      [name]: value,
      id: tableId, //TABLE ID
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("estoy en create order");
    // joinRoom();
    props.orderSent();
    props.receiveOrder(orderForm);
    // productService
    //   .createOrder(orderForm)
    //   .then(() => console.log("producto creado con exito"))
    //   .catch((e) => console.log(e));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        Lista de productos
        {products.map((product) => {
          return (
            <li key={product._id}>
              <p>{product.name}</p> {product.price}
              <input
                type="number"
                name={product.name}
                onChange={handleInputChange}
              ></input>
              <input
                type="hidden"
                name="id"
                value="621f984c745ab17740b49361"
              ></input>
            </li>
          );
        })}
        <Button type="submit">Enviar orden</Button>
      </Form>
    </>
  );
};

export default CreateOrder;
