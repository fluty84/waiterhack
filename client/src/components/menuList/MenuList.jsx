import { Button, requirePropFactory } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import restaurantService from "../../services/restaurant.services";
import productService from "../../services/product.services";
import bin from "./bin.svg"

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

  const handleDelete = (_id) => {
    productService
      .deleteProduct(_id)
      .then(() => loadMenu())
      .catch(e => { throw e })
  }



  return (
    <>
      <ul className="list">
        <h2>Menú</h2>
        {!products ? 
        (
        <div class="spinner-border text-light" role="status">
          <span class="sr-only"> Cargando menú...</span>
        </div> ): 
        products.map((product) => {
          return (
            <li key={product._id}>
              <p>{product.name} {product.price}€
                <button onClick={() => { handleDelete(product._id) }}>
                  <img className="bin" src={bin} alt="eliminar" />
                </button>
              </p>
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

