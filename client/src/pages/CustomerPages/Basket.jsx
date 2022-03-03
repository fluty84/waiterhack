import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateTable from "../../components/table/CreateTable";
import productService from "../../services/product.services";

function Basket() {
  let data = "";
  const { tableId } = useParams();

  const [order, setOrder] = useState([]);
  productService.displayOrder(tableId).then((x) => console.log(x));
  useEffect(() => {}, []);

  return (
    <>
      <h1>{order.adress}</h1>
    </>
  );
}

export default Basket;
