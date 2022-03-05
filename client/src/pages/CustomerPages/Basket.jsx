import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateTable from "../../components/table/CreateTable";
import productService from "../../services/product.services";
import restaurantService from "../../services/restaurant.services";
import io from "socket.io-client"

let ENDPOINT = "http://localhost:5000"
let socket = io()


function Basket() {
  let response = "";
  let currentOrder = "";
  const { tableId, _id } = useParams();

  const [orders, setOrder] = useState([]);
  const [totalProducts, setTotalProducts] = useState({});
  const [ticket, setTicket] = useState([]);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    productService.displayOrder(tableId).then((response) => {
      setOrder(response.data.result.currentOrder);
    });
  }, []);
  const cuenta = {};

  useEffect(() => {
    filter(orders);
    calculateTotal();
  }, [orders, changes]);

  useEffect(() => {
    setChanges(true);
  }, [ticket]);

  let cuentaTotal = null;

  function filter() {
    // suma el total de productos
    let newArr = [];
    orders.forEach((x) => {
      newArr.push(Object.keys(x).flat());
    });
    const flatArr = newArr.flat();
    const uniqueKeys = [...new Set(flatArr)];
    const filteredArr = uniqueKeys.filter((x) => {
      return x != "id";
    });

    filteredArr.forEach((item) => {
      cuenta[item] = 0;
    });

    filteredArr.forEach((product) => {
      orders.forEach((ord) => {
        for (const property in ord) {
          if (property == product) {
            cuenta[product] += parseInt(ord[property]);
          }
        }
      });
    });
    cuentaTotal = { ...cuenta };
  }

  function calculateTotal() {
    //multiplica por el total

    let menu = [];

    restaurantService
      .getRestaurant({ _id })
      .then((rest) => {
        menu = rest.data.menu;
      })
      .then(() => {
        console.log("el menu", menu);
        let keyArr = Object.keys(cuentaTotal);

        keyArr.forEach((key) => {
          console.log("soy la key", key, "y menu", menu);
          menu.forEach((item) => {
            if (item.name === key) {
              console.log(item.price, "x", cuentaTotal);

              cuentaTotal[key] *= item.price;
            }
          });
        });
        setTicket(cuentaTotal);
        const jsx = Object.entries(ticket).forEach(([key, value]) => {});
      });
  }

  // const isNew = () => {

  //   if(JSON.stringify(ticket) != JSON.stringify(cuenta)){
  //     setChanges(true)
  //   }
  // }

  return (
    <>
      {changes &&
        Object.entries(ticket).map((key) => (
          <p>
            {key[0]} {key[1]}
          </p>
        ))}
    </>
  );
}
export default Basket;

//  Object.entries(ticket).forEach(([key, value]) => {
//           return (
//             <li>
//               {" "}
//               {key} total {value}{" "}
//             </li>
//           );
//         })
