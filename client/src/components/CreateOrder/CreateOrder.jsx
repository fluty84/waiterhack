import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import restaurantService from "../../services/restaurant.services";
import { Fab } from "@mui/material";
import { Form, Button } from "react-bootstrap";
import productService from "../../services/product.services";
import { useParams } from "react-router-dom";

const CreateOrder = (props) => {
  const [products, setProducts] = useState([]);
  const [productNum, setProductNum] = useState([props.isUpdated]);

  const [orderForm, setOrderForm] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setOrderForm({
      ...orderForm,
      [name]: value,
      id: tableId, //TABLE ID
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    productService
      .createOrder(orderForm)
      .then((x) => console.log(x))
      .catch((e) => console.log(e));
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
