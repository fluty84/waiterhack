import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import CreateTable from "../../components/table/CreateTable";
import productService from "../../services/product.services";
import restaurantService from "../../services/restaurant.services";
import { Form, Table } from "react-bootstrap";
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

  if (_id) {
  } else {
    _id = props._id;
    tableId = props.tableId;
  }

  const joinRoom = () => {
    socket.emit("join_room", orders);
  };

  socket.on("join_room", function (msg) {
    if (msg === "ACEPTADO") {
      setIsOrder(msg);
      setIsOrder(true);
    }
  });

  const [orders, setOrder] = useState([]);
  const [totalProducts, setTotalProducts] = useState({});
  const [ticket, setTicket] = useState([]);
  const [changes, setChanges] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isSubmittedOrder, setIsSubmittedOrder] = useState(false);
  const [isReceivedMsg, setIsReceivedMsg] = useState(false);
  const didMount = useRef(false);

  // useEffect(() => {
  //   productService.displayOrder(tableId).then((response) => {
  //     setOrder(response.data.result.currentOrder);
  //   });
  // }, []);

  useEffect(() => {
    if (didMount.current) {
      setOrder([...orders, props.orderForm]);

      console.log(props.orderForm, "this is an order form");
      console.log(
        ...orders,
        "-------------------------!!!!!!!!!!!!!!!!!!!!!!!"
      );
    } else {
      didMount.current = true;
    }
  }, [props.isOrderSent]);
  const cuenta = {};

  useEffect(() => {
    if (didMount.current) {
      productService
        .createOrder(...orders, tableId)
        .then(() => console.log("producto creado con exito"))
        .catch((e) => console.log(e));
    } else {
      didMount.current = true;
    }
  }, [isSubmittedOrder]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmittedOrder(true);
    joinRoom();
  };

  return (
    <>
      {changes &&
        Object.entries(ticket).map((key, idx) => (
          <p>
            {key[0]} {key[1]} Euros.
          </p>
        ))}
      {orders.length !== 0 && (
        <Form onSubmit={handleSubmit}>
          {!isSubmittedOrder ? (
            <button class="btn btn-primary" type="submit">
              Solicitar pedido
            </button>
          ) : (
            <button class="btn btn-primary" type="submit">
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
              </span>{" "}
            </button>
          )}
        </Form>
      )}
    </>
  );
}
export default Basket;
