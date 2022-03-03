import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import restaurantService from "../../services/restaurant.services";

import("./MenuList.css");

const MenuList = (props) => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState([props.isUpdated]);
  if (props.isUpdated === true) {
    setNewProduct(props.isUpdated);
  }

  useEffect(async () => {
    loadMenu();
  }, [newProduct]);

  const loadMenu = () => {
    restaurantService
      .getRestaurant(user)
      .then((response) => setProducts(response.data.menu))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ul>
        {" "}
        Lista de productos
        {products.map((product) => {
          return (
            <li>
              {" "}
              <p>{product.name}</p> {product.price}
              <input type="number"></input>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MenuList;
