import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import CreateTable from "../table/CreateTable";
import productService from "../../services/product.services";
import restaurantService from "../../services/restaurant.services";
import { Form, Table } from "react-bootstrap";
import io from "socket.io-client";
import { Button } from "@mui/material";

const socket = io.connect("http://localhost:3001");

function Basket(props) {

  const { isLoggedIn } = useContext(AuthContext);

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
      setIsAcceptedBtn(false);
    }
  });

  const [orders, setOrder] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [changes, setChanges] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [isSubmittedOrder, setIsSubmittedOrder] = useState(false);
  const [isAcceptedBtn, setIsAcceptedBtn] = useState(false);
  const [qtyProductsArr, setQtyProductsArr] = useState([])
  const [orderForm, setOrderForm] = useState(props.orderForm);

  const didMount = useRef(false);

  useEffect(() => {
    productService.displayOrder(tableId).then((response) => {
      setOrder(response.data.result.currentOrder);
    });
  }, []);

  useEffect(() => {
    if (didMount.current) {
      setOrder([...orders, props.orderForm]);
    } else {
      didMount.current = true;
    }
  }, [props.isOrderSent]);
  const cuenta = {};

  //TODO filter object orders with key-values that are greater than 0

  useEffect(() => {
    if (didMount.current) {
      productService
        .createOrder(...orders, tableId)
        .then(() => console.log("producto creado con exito"))
        .catch((err) => console.log(err));
    } else {
      didMount.current = true;
    }
  }, [isSubmittedOrder]);

  useEffect(() => { ///Renderizado general
    filter(orders);
    calculateTotal();
    qtySum(cuenta)
  }, [orders, changes]);


  useEffect(() => {
    setChanges(true);
  }, [ticket]);

  useEffect(() => {
    qtySum()
  }, [cuenta]);

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

        // const jsx = Object.entries(ticket).forEach(([key, value]) => {});
      });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAcceptedBtn(true);
    setIsSubmittedOrder(true);
    joinRoom();
  };



  const qtySum = (cuenta) => {
    if (cuenta) {
      const productArr = []
      Object.values(cuenta).map(item => {
        productArr.push(item)
      })
      setQtyProductsArr(productArr)

    }

  }

  useEffect(() => {
    if (props.isTicketModified) {
      setTicket([])
      setOrder([])
      props.toggleTicket()
    }
  }, [props.isTicketModified])

  return (
    <>

      {changes &&
        Object.entries(ticket).map((key, idx) => (

          key[1] > 0 ? (<div className="food">
            <p>
              {key[0]} {key[1]} Euros. Unidades = {qtyProductsArr[idx]}
            </p>

          </div>) : null

        ))}


      {orders.length !== 0 && (
        <Form onSubmit={handleSubmit}>
          {!isAcceptedBtn && !isLoggedIn ? (
            <button className="btn btn-primary" type="submit">
              Solicitar pedido
            </button>
          ) : (
            <button className="btn btn-primary" type="submit">
              <span
                className={isOrder ? null : "spinner-border spinner-border-sm"}
                // class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">
                {isOrder ? (
                  <span>Orden Lista</span>
                ) : (
                  <span>Esperando confirmación</span>
                )}
              </span>
            </button>
          )}
        </Form>
      )}
      <Button onClick={props.clearOrder}>Modificar Pedido</Button>


    </>
  );
}
export default Basket;
