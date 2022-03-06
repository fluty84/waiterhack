import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateTable from "../../components/table/CreateTable";
import productService from "../../services/product.services";
import restaurantService from "../../services/restaurant.services";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

/**
 * Basket 
 * @arg props: Object { _id: number, tableId: number }
 */
function Basket(props) {
  let response = "";
  let currentOrder = "";

  let { tableId, _id } = useParams();
  console.log(Object.keys(useParams()));

  if (_id) {
    console.log("heyeyye jude");
  } else {
    _id = props._id;
    tableId = props.tableId;
  }

  const [orders, setOrder] = useState([]);
  const [totalProducts, setTotalProducts] = useState({});
  const [ticket, setTicket] = useState([]);
  const [changes, setChanges] = useState(false);
  const [isOrder, setIsOrder] = useState(false);

  socket.on("join_room", function (msg) {
    console.log(msg, "en dayPanel");
    setIsOrder(msg);
  });

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
    orders.forEach((product) => {
      newArr.push(Object.keys(product).flat());
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
    console.log('la cuenta es',cuentaTotal)
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
        let keyArr = Object.keys(cuentaTotal);

        keyArr.forEach((key) => {
          menu.forEach((item) => {
            if (item.name === key) {
              cuentaTotal[key] *= item.price;
            }
          });
        });
        setTicket(cuentaTotal);
        console.log("el ticket", ticket);
        // const jsx = Object.entries(ticket).forEach(([key, value]) => {});
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
        Object.entries(ticket).map((key, idx) => (
          <p>
            {key[0]} {key[1]}
          </p>
        ))}
      <button class="btn btn-primary" type="button" disabled>
        <span
          class={isOrder ? null : "spinner-border spinner-border-sm"}
          // class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span class="sr-only">
          {isOrder ? (
            <span>Orden Lista</span>
          ) : (
            <span>Esperando confirmación</span>
          )}
        </span>
      </button>
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
