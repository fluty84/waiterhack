import { Button} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import restaurantService from "../../services/restaurant.services";

import("./MenuList.css");

const MenuList = ({ newProduct }) => {
  
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadMenu();
  }, [user]);

  useEffect(() => {
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
        <h3>Lista de productos</h3>
        {products.map((product) => {
          return (
            <li key={product._id}>
              <p>{product.name} {product.price}€</p> 
              <hr></hr>
            </li>
            
          );
        })}
      </ul>
      <Link to="/" className='link' ><Button className="btn-primary btn-back">Volver</Button></Link>

    </>
  );
};

export default MenuList;
